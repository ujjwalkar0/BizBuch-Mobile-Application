import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { createPostHeader } = theme.components;

interface CreatePostHeaderProps {
  type: 'add' | 'edit';
  disabled: boolean;
  onPost: () => void;
  onBack?: () => void;
}

/**
 * CreatePostHeader Molecule
 * Atomic Design: Molecule - Header with title and action button
 * Single Responsibility: Display create/edit post header with post action
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({
  type,
  disabled,
  onPost,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: createPostHeader.paddingHorizontal,
      paddingVertical: createPostHeader.paddingVertical,
      borderBottomWidth: createPostHeader.borderBottomWidth,
      borderColor: theme.colors.gray200,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: createPostHeader.titleFontSize,
      fontWeight: createPostHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: disabled ? theme.colors.gray300 : theme.colors.primary,
      paddingHorizontal: createPostHeader.buttonPaddingHorizontal,
      paddingVertical: createPostHeader.buttonPaddingVertical,
      borderRadius: createPostHeader.buttonBorderRadius,
    }),
    [disabled],
  );

  const buttonTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontSize: createPostHeader.buttonFontSize,
      fontWeight: createPostHeader.buttonFontWeight,
    }),
    [],
  );

  const title = type === 'add' ? 'Create Post' : 'Edit Post';

  return (
    <View style={containerStyle}>
      <View>
        <Text style={titleStyle}>{title}</Text>
      </View>

      <TouchableOpacity
        onPress={onPost}
        disabled={disabled}
        style={buttonStyle}
        activeOpacity={0.7}
      >
        <Text style={buttonTextStyle}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};
