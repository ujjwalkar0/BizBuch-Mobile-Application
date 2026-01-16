import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { postFollowButton } = theme.components;

interface FollowButtonProps {
  isFollowing: boolean;
  onPress?: () => void;
}

/**
 * FollowButton Atom
 * Atomic Design: Atom - Follow/Following toggle button
 * Single Responsibility: Display follow state button
 * SOLID: Open/Closed - Styles from theme
 */
export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  onPress,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      paddingVertical: postFollowButton.paddingVertical,
      paddingHorizontal: postFollowButton.paddingHorizontal,
      borderRadius: postFollowButton.borderRadius,
      backgroundColor: isFollowing ? theme.colors.gray200 : theme.colors.primary,
    }),
    [isFollowing],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postFollowButton.fontSize,
      fontWeight: postFollowButton.fontWeight,
      color: isFollowing ? theme.colors.gray700 : theme.colors.white,
    }),
    [isFollowing],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
      <Text style={textStyle}>{isFollowing ? 'Following' : 'Follow'}</Text>
    </TouchableOpacity>
  );
};
