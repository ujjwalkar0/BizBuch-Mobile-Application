import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { MessageTextInput } from '../atoms/MessageTextInput';
import { AttachmentButton } from './AttachmentButton';
import { SendButton } from './SendButton';
import { VoiceButton } from './VoiceButton';
import { theme } from '../../theme';

const { chatInput } = theme.components;

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
  placeholder?: string;
  onAttachment?: () => void;
  onVoice?: () => void;
}

/**
 * ChatInput Organism
 * Atomic Design: Organism - Composed of MessageTextInput atom + AttachmentButton, SendButton, VoiceButton molecules
 * SOLID: Single Responsibility - Chat input bar orchestration
 * SOLID: Open/Closed - Styles from theme, extensible via props
 * SOLID: Dependency Inversion - Depends on abstractions (atoms/molecules)
 * Reuses: MessageTextInput atom, AttachmentButton, SendButton, VoiceButton molecules
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  isSending,
  placeholder = 'Type a message...',
  onAttachment,
  onVoice,
}) => {
  const hasText = value.trim().length > 0;
  const isDisabled = !hasText || isSending;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: chatInput.paddingHorizontal,
      paddingVertical: chatInput.paddingVertical,
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: chatInput.gap,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <AttachmentButton onPress={onAttachment} />

      <MessageTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />

      {hasText ? (
        <SendButton
          onPress={onSend}
          disabled={isDisabled}
          isSending={isSending}
        />
      ) : (
        <VoiceButton onPress={onVoice} />
      )}
    </View>
  );
};
