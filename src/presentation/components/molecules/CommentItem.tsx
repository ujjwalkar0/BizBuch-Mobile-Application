import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { Comment } from '../../../domain/post/entities/Comment';
import { CommentFormatter } from '../../../data/services/CommentFormatter';
import { theme } from '../../theme';

const { commentItem } = theme.components;

interface CommentItemProps {
  comment: Comment;
}

/**
 * CommentItem Molecule
 * Atomic Design: Molecule - Single comment display
 * Single Responsibility: Display one comment with avatar, username, and content
 * SOLID: Open/Closed - Styles from theme
 */
export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formattedTime = useMemo(
    () => CommentFormatter.formatTime(comment.created_at),
    [comment.created_at],
  );

  const initial = useMemo(
    () => CommentFormatter.getInitials(comment.user),
    [comment.user],
  );

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      paddingVertical: commentItem.paddingVertical,
      paddingHorizontal: commentItem.paddingHorizontal,
    }),
    [],
  );

  const avatarStyle = useMemo<ViewStyle>(
    () => ({
      width: commentItem.avatarSize,
      height: commentItem.avatarSize,
      borderRadius: commentItem.avatarSize / 2,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: commentItem.avatarMarginRight,
    }),
    [],
  );

  const avatarTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontSize: commentItem.avatarFontSize,
      fontWeight: '600',
    }),
    [],
  );

  const contentStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
    }),
    [],
  );

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: commentItem.headerMarginBottom,
    }),
    [],
  );

  const usernameStyle = useMemo<TextStyle>(
    () => ({
      fontSize: commentItem.usernameFontSize,
      fontWeight: '600',
      color: theme.colors.gray900,
      marginRight: commentItem.usernameMarginRight,
    }),
    [],
  );

  const timeStyle = useMemo<TextStyle>(
    () => ({
      fontSize: commentItem.timeFontSize,
      color: theme.colors.gray500,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: commentItem.contentFontSize,
      color: theme.colors.gray700,
      lineHeight: commentItem.contentLineHeight,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={avatarStyle}>
        <Text style={avatarTextStyle}>{initial}</Text>
      </View>
      <View style={contentStyle}>
        <View style={headerStyle}>
          <Text style={usernameStyle}>{comment.user}</Text>
          <Text style={timeStyle}>{formattedTime}</Text>
        </View>
        <Text style={textStyle}>{comment.content}</Text>
      </View>
    </View>
  );
};
