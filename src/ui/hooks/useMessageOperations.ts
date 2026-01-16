import { useCallback, useEffect } from 'react';
import { useMarkAsRead } from './useChat';
import { Message } from '../../domain/chat/entities/Message';

interface MessageOperationsProps {
  conversationId: number | null;
  otherParticipantId: number | null;
  messages: Message[];
  isWebSocketConnected: boolean;
  markMessagesReadWS: (messageIds: number[]) => void;
}

/**
 * Custom hook for message operations
 * Single Responsibility: Handles read receipts, message flattening
 */
export const useMessageOperations = ({
  conversationId,
  otherParticipantId,
  messages,
  isWebSocketConnected,
  markMessagesReadWS,
}: MessageOperationsProps) => {
  const markAsReadMutation = useMarkAsRead();

  // Mark messages as read when conversation opens
  useEffect(() => {
    if (!conversationId || messages.length === 0 || !otherParticipantId) return;

    const unreadMessageIds = messages
      .filter(m => !m.is_read && m.sender.id === otherParticipantId)
      .map(m => m.id);

    if (unreadMessageIds.length === 0) return;

    if (isWebSocketConnected) {
      markMessagesReadWS(unreadMessageIds);
    } else {
      markAsReadMutation.mutate({
        conversationId,
        messageIds: unreadMessageIds,
      });
    }
  }, [
    conversationId,
    messages,
    otherParticipantId,
    isWebSocketConnected,
    markMessagesReadWS,
    markAsReadMutation,
  ]);

  return {
    markAsReadMutation,
  };
};
