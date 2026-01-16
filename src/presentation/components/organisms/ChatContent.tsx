import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { MessageList } from '../molecules/MessageList';
import { ChatInput } from '../molecules/ChatInput';
import { Message } from '../../../domain/chat/entities/Message';

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onEndReached: () => void;
  onContentSizeChange: () => void;
  flatListRef: React.RefObject<FlatList | null>;
  messageText: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
}

/**
 * ChatContent Organism
 * Atomic Design: Organism - Combines MessageList + ChatInput with keyboard handling
 * SOLID: Single Responsibility - Message display and input orchestration
 * SOLID: Open/Closed - Extensible via props
 */
export const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onEndReached,
  onContentSizeChange,
  flatListRef,
  messageText,
  onTextChange,
  onSend,
  isSending,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <MessageList
        messages={messages}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onEndReached={onEndReached}
        onContentSizeChange={onContentSizeChange}
        flatListRef={flatListRef}
      />

      <ChatInput
        value={messageText}
        onChangeText={onTextChange}
        onSend={onSend}
        isSending={isSending}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
