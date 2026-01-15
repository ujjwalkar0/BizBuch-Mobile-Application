import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { postStats } = theme.components;

interface PostStatsProps {
  likesCount: number;
  commentsCount: number;
  onCommentsPress?: () => void;
}

/**
 * PostStats Molecule
 * Atomic Design: Molecule - Likes and comments count display
 * Single Responsibility: Display post engagement stats
 * SOLID: Open/Closed - Styles from theme
 */
export const PostStats: React.FC<PostStatsProps> = ({
  likesCount,
  commentsCount,
  onCommentsPress,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: postStats.paddingHorizontal,
      paddingBottom: postStats.paddingBottom,
    }),
    [],
  );

  const likesStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postStats.likesFontSize,
      fontWeight: postStats.likesFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const commentsLinkStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postStats.commentsFontSize,
      color: theme.colors.gray500,
      marginTop: postStats.commentsMarginTop,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Text style={likesStyle}>{likesCount.toLocaleString()} likes</Text>
      {commentsCount > 0 && (
        <TouchableOpacity onPress={onCommentsPress}>
          <Text style={commentsLinkStyle}>
            View all {commentsCount} comments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
