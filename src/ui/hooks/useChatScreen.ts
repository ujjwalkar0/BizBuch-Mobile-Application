import { useRef, useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useMessages, useSendMessage } from './useChat';
import { useChatWebSocket, WebSocketConnectionError } from './useChatWebSocket';
import { useConversation } from './useConversation';
import { useTypingIndicator } from './useTypingIndicator';
import { useMessageOperations } from './useMessageOperations';
import { HeaderAction } from '../../presentation/components/organisms/ChatHeader';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../presentation/theme';
import { Message } from '../../domain/chat/entities/Message';

interface UseChatScreenProps {
  userId: number;
  onGoBack: () => void;
}

interface UseChatScreenReturn {
  // Refs
  flatListRef: React.RefObject<FlatList | null>;

  // Conversation state
  conversationId: number | null;
  otherParticipantName: string;
  isConversationLoading: boolean;

  // Messages
  messages: Message[];
  isLoadingMessages: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;

  // WebSocket state
  isWebSocketConnected: boolean;
  isWebSocketConnecting: boolean;
  wsConnectionError: WebSocketConnectionError | null;
  reconnectAttempts: number;
  reconnectWebSocket: () => void;

  // Input state
  messageText: string;
  handleTextChange: (text: string) => void;
  handleSend: () => void;
  isSending: boolean;

  // Header
  chatActions: HeaderAction[];
}

/**
 * useChatScreen Hook (Facade Pattern)
 * SOLID: Single Responsibility - Consolidates all chat screen logic
 * SOLID: Dependency Inversion - Depends on abstracted hooks
 * Pattern: Facade - Simplifies complex hook interactions
 */
export const useChatScreen = ({
  userId,
  onGoBack,
}: UseChatScreenProps): UseChatScreenReturn => {
  const flatListRef = useRef<FlatList>(null);

  // Initialize conversation
  const {
    conversationId,
    otherParticipantId,
    otherParticipantName,
    isLoading: isConversationLoading,
  } = useConversation(userId);

  // Messages query
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(conversationId ?? 0);

  // WebSocket connection
  const {
    isConnected: isWebSocketConnected,
    isConnecting: isWebSocketConnecting,
    connectionError: wsConnectionError,
    reconnectAttempts,
    sendMessage: sendWebSocketMessage,
    sendTyping,
    sendStopTyping,
    markMessagesRead: markMessagesReadWS,
    reconnect: reconnectWebSocket,
  } = useChatWebSocket({
    conversationId,
    onMessage: () => {
      scrollToEnd();
    },
    onTyping: () => {},
    onReadReceipt: () => {},
    onUserStatus: () => {},
    onError: error => console.error('WebSocket error:', error),
    onConnectionError: error =>
      console.error('WebSocket connection error:', error.code, error.message),
  });

  // Typing indicator management
  const { messageText, setMessageText, handleTextChange, clearTyping } =
    useTypingIndicator(isWebSocketConnected, sendTyping, sendStopTyping);

  // Flatten messages from infinite query
  const messages = useMemo(() => {
    if (!messagesData?.pages) return [];
    return messagesData.pages.flatMap(page => page.results);
  }, [messagesData]);

  // Message operations
  useMessageOperations({
    conversationId,
    otherParticipantId,
    messages,
    isWebSocketConnected,
    markMessagesReadWS,
  });

  // Send message mutation
  const sendMessageMutation = useSendMessage();

  // Scroll helper
  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  // Send message handler
  const handleSend = useCallback(() => {
    if (!messageText.trim() || !userId) return;

    clearTyping();

    if (isWebSocketConnected) {
      sendWebSocketMessage(messageText.trim());
      setMessageText('');
      scrollToEnd();
    } else {
      sendMessageMutation.mutate(
        { recipient_id: userId, content: messageText.trim() },
        {
          onSuccess: () => {
            setMessageText('');
            scrollToEnd();
          },
        },
      );
    }
  }, [
    messageText,
    userId,
    isWebSocketConnected,
    sendWebSocketMessage,
    clearTyping,
    setMessageText,
    sendMessageMutation,
    scrollToEnd,
  ]);

  // Header actions
  const chatActions: HeaderAction[] = useMemo(
    () => [
      {
        key: 'menu',
        icon: faEllipsisVertical,
        onPress: () => {},
        color: theme.colors.gray600,
        size: 18,
      },
    ],
    [],
  );

  return {
    flatListRef,
    conversationId,
    otherParticipantName,
    isConversationLoading,
    messages,
    isLoadingMessages,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
    isWebSocketConnected,
    isWebSocketConnecting,
    wsConnectionError,
    reconnectAttempts,
    reconnectWebSocket,
    messageText,
    handleTextChange,
    handleSend,
    isSending: sendMessageMutation.isPending && !isWebSocketConnected,
    chatActions,
  };
};
