import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing typing indicators
 * Single Responsibility: Handles typing state and timeout logic
 */
export const useTypingIndicator = (
  isWebSocketConnected: boolean,
  onTyping: () => void,
  onStopTyping: () => void,
) => {
  const [messageText, setMessageText] = useState('');
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTextChange = useCallback(
    (text: string) => {
      setMessageText(text);

      if (isWebSocketConnected && text.length > 0) {
        onTyping();

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          onStopTyping();
        }, 2000);
      }
    },
    [isWebSocketConnected, onTyping, onStopTyping],
  );

  const clearTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    onStopTyping();
  }, [onStopTyping]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    messageText,
    setMessageText,
    handleTextChange,
    clearTyping,
  };
};
