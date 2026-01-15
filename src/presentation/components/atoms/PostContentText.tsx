import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { postContent } = theme.components;

interface PostContentTextProps {
  content: string;
}

/**
 * PostContentText Atom
 * Atomic Design: Atom - Post text content display
 * Single Responsibility: Display post text
 * SOLID: Open/Closed - Styles from theme
 */
export const PostContentText: React.FC<PostContentTextProps> = ({ content }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: postContent.paddingHorizontal,
      paddingBottom: postContent.paddingBottom,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postContent.fontSize,
      color: theme.colors.gray900,
      lineHeight: postContent.lineHeight,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{content}</Text>
    </View>
  );
};
