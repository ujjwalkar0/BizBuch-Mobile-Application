import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { postInputBar } = theme.components;

interface PostInputBarProps {
  placeholder?: string;
  style?: ViewStyle;
}

/**
 * PostInputBar Atom
 * Atomic Design: Atom - Placeholder input bar for post creation
 * Single Responsibility: Display styled input placeholder
 * SOLID: Open/Closed - Styles from theme
 */
export const PostInputBar: React.FC<PostInputBarProps> = ({
  placeholder = "What's on your mind?",
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      marginLeft: postInputBar.marginLeft,
      paddingVertical: postInputBar.paddingVertical,
      paddingHorizontal: postInputBar.paddingHorizontal,
      backgroundColor: theme.colors.gray100,
      borderRadius: postInputBar.borderRadius,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postInputBar.fontSize,
      color: theme.colors.gray500,
    }),
    [],
  );

  return (
    <View style={[containerStyle, style]}>
      <Text style={textStyle}>{placeholder}</Text>
    </View>
  );
};
