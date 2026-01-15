import React, { useState, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { commentInput } = theme.components;

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
}

/**
 * CommentInput Molecule
 * Atomic Design: Molecule - Input field with submit button for comments
 * Single Responsibility: Handle comment text input and submission
 * SOLID: Open/Closed - Styles from theme
 */
export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isSubmitting) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: commentInput.paddingHorizontal,
      paddingVertical: commentInput.paddingVertical,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const inputContainerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.gray100,
      borderRadius: commentInput.inputBorderRadius,
      paddingHorizontal: commentInput.inputPaddingHorizontal,
      marginRight: commentInput.inputMarginRight,
    }),
    [],
  );

  const inputStyle = useMemo<TextStyle>(
    () => ({
      flex: 1,
      fontSize: commentInput.fontSize,
      color: theme.colors.gray900,
      paddingVertical: commentInput.inputPaddingVertical,
      maxHeight: commentInput.maxInputHeight,
    }),
    [],
  );

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      width: commentInput.buttonSize,
      height: commentInput.buttonSize,
      borderRadius: commentInput.buttonSize / 2,
      backgroundColor: text.trim() ? theme.colors.primary : theme.colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isSubmitting ? 0.5 : 1,
    }),
    [text, isSubmitting],
  );

  return (
    <View style={containerStyle}>
      <View style={inputContainerStyle}>
        <TextInput
          style={inputStyle}
          placeholder="Add a comment..."
          placeholderTextColor={theme.colors.gray500}
          value={text}
          onChangeText={setText}
          multiline
          editable={!isSubmitting}
        />
      </View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handleSubmit}
        disabled={!text.trim() || isSubmitting}
        activeOpacity={0.7}
      >
        <FontAwesomeIcon
          icon={faPaperPlane}
          size={commentInput.iconSize}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};
