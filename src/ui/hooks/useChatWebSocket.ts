// ui/hooks/useChatWebSocket.ts
import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../core/config';
import { Message } from '../../domain/chat/entities/Message';

// WebSocket close codes from backend
const WS_CLOSE_CODES = {
  NORMAL: 1000,
  UNAUTHORIZED: 4001,
  FORBIDDEN: 4003,
} as const;

// Error codes from server error messages
export type WebSocketErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN';

export type WebSocketMessageType = 
  | 'chat_message' 
  | 'typing' 
  | 'stop_typing' 
  | 'mark_read' 
  | 'messages_read'
  | 'user_online'
  | 'user_offline'
  | 'error';

export interface WebSocketIncomingMessage {
  type: WebSocketMessageType;
  message_id?: number;
  content?: string;
  sender_id?: number;
  sender_username?: string;
  timestamp?: string;
  user_id?: number;
  username?: string;
  is_typing?: boolean;
  message_ids?: number[];
  read_by?: number;
  read_at?: string;
  message?: string; // for error type
  code?: WebSocketErrorCode; // for error type
}

export interface WebSocketOutgoingMessage {
  type: 'chat_message' | 'typing' | 'stop_typing' | 'mark_read';
  content?: string;
  message_ids?: number[];
}

export interface WebSocketConnectionError {
  code: WebSocketErrorCode | 'CONNECTION_ERROR' | 'MAX_RETRIES_EXCEEDED';
  message: string;
}

interface UseChatWebSocketOptions {
  conversationId: number | null;
  onMessage?: (message: WebSocketIncomingMessage) => void;
  onTyping?: (userId: number, isTyping: boolean) => void;
  onReadReceipt?: (messageIds: number[], readBy: number) => void;
  onUserStatus?: (userId: number, isOnline: boolean) => void;
  onError?: (error: string) => void;
  onConnectionError?: (error: WebSocketConnectionError) => void;
}

interface UseChatWebSocketReturn {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: WebSocketConnectionError | null;
  reconnectAttempts: number;
  sendMessage: (content: string) => void;
  sendTyping: () => void;
  sendStopTyping: () => void;
  markMessagesRead: (messageIds: number[]) => void;
  reconnect: () => void;
  resetConnection: () => void;
}

// Reconnection configuration
const RECONNECT_CONFIG = {
  MAX_ATTEMPTS: 5,
  INITIAL_DELAY_MS: 1000,
  MAX_DELAY_MS: 30000,
  BACKOFF_MULTIPLIER: 2,
};

// Calculate exponential backoff delay
const getReconnectDelay = (attempt: number): number => {
  const delay = RECONNECT_CONFIG.INITIAL_DELAY_MS * Math.pow(RECONNECT_CONFIG.BACKOFF_MULTIPLIER, attempt);
  return Math.min(delay, RECONNECT_CONFIG.MAX_DELAY_MS);
};

// Check if close code should prevent auto-reconnect
const shouldNotReconnect = (closeCode: number): boolean => {
  return closeCode === WS_CLOSE_CODES.NORMAL || 
         closeCode === WS_CLOSE_CODES.UNAUTHORIZED || 
         closeCode === WS_CLOSE_CODES.FORBIDDEN;
};

// Get user-friendly error message for close codes
const getErrorMessageForCode = (closeCode: number, serverMessage?: string): string => {
  switch (closeCode) {
    case WS_CLOSE_CODES.UNAUTHORIZED:
      return serverMessage || 'Authentication failed. Please log in again.';
    case WS_CLOSE_CODES.FORBIDDEN:
      return serverMessage || 'You do not have access to this conversation.';
    default:
      return serverMessage || 'Connection closed unexpectedly.';
  }
};

export const useChatWebSocket = ({
  conversationId,
  onMessage,
  onTyping,
  onReadReceipt,
  onUserStatus,
  onError,
  onConnectionError,
}: UseChatWebSocketOptions): UseChatWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const lastErrorRef = useRef<{ code?: WebSocketErrorCode; message?: string } | null>(null);
  const shouldReconnectRef = useRef(true);
  const conversationIdRef = useRef(conversationId);
  
  // Store callbacks in refs to avoid triggering reconnections when they change
  const callbacksRef = useRef({
    onMessage,
    onTyping,
    onReadReceipt,
    onUserStatus,
    onError,
    onConnectionError,
  });
  
  // Update callback refs when they change (without triggering reconnection)
  useEffect(() => {
    callbacksRef.current = {
      onMessage,
      onTyping,
      onReadReceipt,
      onUserStatus,
      onError,
      onConnectionError,
    };
  }, [onMessage, onTyping, onReadReceipt, onUserStatus, onError, onConnectionError]);
  
  // Update conversationId ref
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<WebSocketConnectionError | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  const queryClient = useQueryClient();

  // Clear reconnection timeout
  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Reset connection state for fresh start
  const resetConnectionState = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    setReconnectAttempts(0);
    setConnectionError(null);
    lastErrorRef.current = null;
    shouldReconnectRef.current = true;
  }, []);

  // Connect to WebSocket
  const connect = useCallback(async () => {
    const currentConversationId = conversationIdRef.current;
    if (!currentConversationId || currentConversationId <= 0) return;

    // Clean up existing connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    clearReconnectTimeout();
    setIsConnecting(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token available for WebSocket connection');
        setIsConnecting(false);
        const error: WebSocketConnectionError = {
          code: 'UNAUTHORIZED',
          message: 'No authentication token available. Please log in.',
        };
        setConnectionError(error);
        callbacksRef.current.onConnectionError?.(error);
        return;
      }

      // Construct WebSocket URL: ws://host/ws/chat/<conversation_id>/?token=<jwt>
      const wsUrl = `${Config.CHAT_WS_URL}ws/chat/${currentConversationId}/?token=${token}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected for conversation:', currentConversationId);
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
        // Reset reconnection attempts on successful connection
        reconnectAttemptsRef.current = 0;
        setReconnectAttempts(0);
        lastErrorRef.current = null;
      };

      ws.onmessage = (event) => {
        try {
          const data: WebSocketIncomingMessage = JSON.parse(event.data);
          console.log('WebSocket message received:', data.type);

          switch (data.type) {
            case 'chat_message':
              // Invalidate messages query to refresh the list
              queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] });
              queryClient.invalidateQueries({ queryKey: ['conversations'] });
              callbacksRef.current.onMessage?.(data);
              break;

            case 'typing':
              if (data.user_id !== undefined && data.is_typing !== undefined) {
                callbacksRef.current.onTyping?.(data.user_id, data.is_typing);
              }
              break;

            case 'messages_read':
              if (data.message_ids && data.read_by !== undefined) {
                // Invalidate to update read status
                queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] });
                callbacksRef.current.onReadReceipt?.(data.message_ids, data.read_by);
              }
              break;

            case 'user_online':
              if (data.user_id !== undefined) {
                callbacksRef.current.onUserStatus?.(data.user_id, true);
              }
              break;

            case 'user_offline':
              if (data.user_id !== undefined) {
                callbacksRef.current.onUserStatus?.(data.user_id, false);
              }
              break;

            case 'error':
              console.error('WebSocket error from server:', data.code, data.message);
              // Store the error for use when connection closes
              lastErrorRef.current = { code: data.code, message: data.message };
              
              // If it's an auth/permission error, don't allow reconnection
              if (data.code === 'UNAUTHORIZED' || data.code === 'FORBIDDEN') {
                shouldReconnectRef.current = false;
              }
              
              callbacksRef.current.onError?.(data.message || 'Unknown error');
              break;

            default:
              console.log('Unknown WebSocket message type:', data.type);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        setIsConnecting(false);
      };

      ws.onclose = (event) => {
        const closeCode = event.code ?? 1006; // Default to abnormal closure if undefined
        console.log('WebSocket closed:', closeCode, event.reason);
        setIsConnected(false);
        setIsConnecting(false);

        // Handle authentication/authorization failures - DO NOT reconnect
        if (shouldNotReconnect(closeCode) || !shouldReconnectRef.current) {
          const errorMessage = getErrorMessageForCode(
            closeCode, 
            lastErrorRef.current?.message || event.reason
          );
          
          let errorCode: WebSocketConnectionError['code'];
          if (closeCode === WS_CLOSE_CODES.UNAUTHORIZED || lastErrorRef.current?.code === 'UNAUTHORIZED') {
            errorCode = 'UNAUTHORIZED';
          } else if (closeCode === WS_CLOSE_CODES.FORBIDDEN || lastErrorRef.current?.code === 'FORBIDDEN') {
            errorCode = 'FORBIDDEN';
          } else {
            // Normal close, no error
            return;
          }

          const error: WebSocketConnectionError = {
            code: errorCode,
            message: errorMessage,
          };
          setConnectionError(error);
          callbacksRef.current.onConnectionError?.(error);
          
          console.log('WebSocket closed due to auth/permission error. Not reconnecting.');
          return;
        }

        // Check if we've exceeded max reconnection attempts
        if (reconnectAttemptsRef.current >= RECONNECT_CONFIG.MAX_ATTEMPTS) {
          console.log('Max reconnection attempts exceeded');
          const error: WebSocketConnectionError = {
            code: 'MAX_RETRIES_EXCEEDED',
            message: `Failed to reconnect after ${RECONNECT_CONFIG.MAX_ATTEMPTS} attempts. Please check your connection and try again.`,
          };
          setConnectionError(error);
          callbacksRef.current.onConnectionError?.(error);
          return;
        }

        // Auto-reconnect with exponential backoff
        if (conversationIdRef.current) {
          const delay = getReconnectDelay(reconnectAttemptsRef.current);
          reconnectAttemptsRef.current += 1;
          setReconnectAttempts(reconnectAttemptsRef.current);
          
          console.log(
            `Attempting to reconnect WebSocket in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${RECONNECT_CONFIG.MAX_ATTEMPTS})...`
          );
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      setIsConnecting(false);
      const connectionErr: WebSocketConnectionError = {
        code: 'CONNECTION_ERROR',
        message: 'Failed to establish connection. Please try again.',
      };
      setConnectionError(connectionErr);
      callbacksRef.current.onConnectionError?.(connectionErr);
    }
  }, [queryClient, clearReconnectTimeout]); // Only stable dependencies

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    clearReconnectTimeout();
    shouldReconnectRef.current = false;

    if (wsRef.current) {
      wsRef.current.close(1000, 'Component unmount');
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
  }, [clearReconnectTimeout]);

  // Send a chat message via WebSocket
  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, cannot send message');
      return;
    }

    const message: WebSocketOutgoingMessage = {
      type: 'chat_message',
      content,
    };

    wsRef.current.send(JSON.stringify(message));
  }, []);

  // Send typing indicator
  const sendTyping = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message: WebSocketOutgoingMessage = { type: 'typing' };
    wsRef.current.send(JSON.stringify(message));
  }, []);

  // Send stop typing indicator
  const sendStopTyping = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message: WebSocketOutgoingMessage = { type: 'stop_typing' };
    wsRef.current.send(JSON.stringify(message));
  }, []);

  // Mark messages as read via WebSocket
  const markMessagesRead = useCallback((messageIds: number[]) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message: WebSocketOutgoingMessage = {
      type: 'mark_read',
      message_ids: messageIds,
    };
    wsRef.current.send(JSON.stringify(message));
  }, []);

  // Reconnect manually (resets attempt counter)
  const reconnect = useCallback(() => {
    resetConnectionState();
    disconnect();
    shouldReconnectRef.current = true;
    connect();
  }, [disconnect, connect, resetConnectionState]);

  // Reset connection completely (clears errors and allows fresh start)
  const resetConnection = useCallback(() => {
    resetConnectionState();
    disconnect();
    shouldReconnectRef.current = true;
  }, [disconnect, resetConnectionState]);

  // Connect when conversationId changes
  useEffect(() => {
    if (conversationId && conversationId > 0) {
      resetConnectionState();
      shouldReconnectRef.current = true;
      connect();
    }

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]); // Only reconnect when conversationId changes

  return {
    isConnected,
    isConnecting,
    connectionError,
    reconnectAttempts,
    sendMessage,
    sendTyping,
    sendStopTyping,
    markMessagesRead,
    reconnect,
    resetConnection,
  };
};
