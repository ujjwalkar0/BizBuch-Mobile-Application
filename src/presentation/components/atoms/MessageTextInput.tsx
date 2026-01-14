import React from 'react';
import { TextInput, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

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
 */
export const MessageTextInput: React.FC<MessageTextInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type a message...',
  maxLength = 1000,
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
  },
  input: {
    maxHeight: 100,
    fontSize: 15,
    color: theme.colors.gray900,
    paddingVertical: 10,
  },
});
