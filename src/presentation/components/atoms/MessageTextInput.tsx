import React, { useMemo } from 'react';
import { TextInput, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { messageTextInput } = theme.components;

interface MessageTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

/**
 * MessageTextInput Atom
 * Atomic Design: Atom - Text input field for messages
 * Single Responsibility: Handle text input display and interaction
 * SOLID: Open/Closed - Styles from theme
 */
export const MessageTextInput: React.FC<MessageTextInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type a message...',
  maxLength = 1000,
  style,
  inputStyle,
}) => {
  const wrapperStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: theme.colors.gray100,
      borderRadius: messageTextInput.borderRadius,
      paddingHorizontal: messageTextInput.paddingHorizontal,
      minHeight: messageTextInput.minHeight,
      justifyContent: 'center',
    }),
    [],
  );

  const textInputStyle = useMemo<TextStyle>(
    () => ({
      maxHeight: messageTextInput.maxHeight,
      fontSize: messageTextInput.fontSize,
      color: theme.colors.gray900,
      paddingVertical: messageTextInput.paddingVertical,
    }),
    [],
  );

  return (
    <View style={[wrapperStyle, style]}>
      <TextInput
        style={[textInputStyle, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline
        maxLength={maxLength}
        placeholderTextColor={theme.colors.gray400}
      />
    </View>
  );
};
