import React from 'react';
import { TextInput } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { styles } from './styles';
import { CreatePostFormValues } from '../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../domain/post/entities/Post';

interface Props {
  control: Control<CreatePostFormValues, any, PostRequestBody>;
}

export const PostInput: React.FC<Props> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="content"
      render={({ field }) => (
        <TextInput
          placeholder="What's on your mind?"
          style={styles.textArea}
          multiline
          value={field.value}
          onChangeText={field.onChange}
        />
      )}
    />
  );
};
