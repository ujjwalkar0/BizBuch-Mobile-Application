import React, { useMemo } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { theme } from '../../theme';
import { CreatePostFormValues } from '../../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../../domain/post/entities/Post';

const { postInput } = theme.components;

interface PostInputProps {
  control: Control<CreatePostFormValues, any, PostRequestBody>;
  placeholder?: string;
}

/**
 * PostInput Molecule
 * Atomic Design: Molecule - Form-controlled text input
 * Single Responsibility: Handle post content input with form control
 * SOLID: Open/Closed - Extensible via placeholder prop, styles from theme
 */
export const PostInput: React.FC<PostInputProps> = ({
  control,
  placeholder = "What's on your mind?",
}) => {
  const textAreaStyle = useMemo<TextStyle>(
    () => ({
      minHeight: postInput.minHeight,
      fontSize: postInput.fontSize,
      paddingHorizontal: postInput.paddingHorizontal,
      paddingVertical: postInput.paddingVertical,
      color: theme.colors.gray900,
      textAlignVertical: postInput.textAlignVertical,
    }),
    [],
  );

  return (
    <Controller
      control={control}
      name="content"
      render={({ field }) => (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray400}
          style={textAreaStyle}
          multiline
          value={field.value}
          onChangeText={field.onChange}
        />
      )}
    />
  );
};
