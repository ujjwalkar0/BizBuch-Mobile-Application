import { useState, useEffect, useCallback } from 'react';
import { useStartConversation } from './useChat';

interface ConversationState {
  conversationId: number | null;
  otherParticipantId: number | null;
  otherParticipantName: string;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook for managing conversation lifecycle
 * Single Responsibility: Handles conversation initialization and state
 */
export const useConversation = (userId: number | null) => {
  const [state, setState] = useState<ConversationState>({
    conversationId: null,
    otherParticipantId: null,
    otherParticipantName: 'Chat',
    isLoading: false,
    error: null,
  });

  const startConversationMutation = useStartConversation();

  useEffect(() => {
    if (!userId) return;

    setState(prev => ({ ...prev, isLoading: true }));

    startConversationMutation.mutate(userId, {
      onSuccess: conversation => {
        const otherParticipant = conversation.other_participant;
        setState({
          conversationId: conversation.id,
          otherParticipantId: otherParticipant?.id ?? null,
          otherParticipantName: otherParticipant?.display_name ?? 'Chat',
          isLoading: false,
          error: null,
        });
      },
      onError: error => {
        console.error('Failed to start conversation:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      },
    });
  }, [userId]);

  return {
    conversationId: state.conversationId,
    otherParticipantId: state.otherParticipantId,
    otherParticipantName: state.otherParticipantName,
    isLoading: state.isLoading,
    error: state.error,
  };
};
