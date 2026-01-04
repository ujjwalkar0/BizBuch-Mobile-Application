import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface Props {
  type: 'add' | 'edit';
  disabled: boolean;
  onPost: () => void;
}

export const CreatePostHeader: React.FC<Props> = ({
  type,
  disabled,
  onPost,
}) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.headerTitle}>
        {type === 'add' ? 'Create Post' : 'Edit Post'}
      </Text>
    </View>

    <TouchableOpacity
      onPress={onPost}
      disabled={disabled}
      style={[styles.postButton, disabled && styles.disabledButton]}
    >
      <Text style={styles.postButtonText}>Post</Text>
    </TouchableOpacity>
  </View>
);
