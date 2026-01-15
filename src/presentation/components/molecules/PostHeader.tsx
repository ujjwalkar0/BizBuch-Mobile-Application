import React, { useMemo } from 'react';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FollowButton } from '../atoms/FollowButton';
import { IconButton } from '../atoms/IconButton';
import { theme } from '../../theme';

const { postHeader, postMenuButton } = theme.components;

interface PostHeaderProps {
  authorName: string;
  authorAvatar?: string;
  isFollowing: boolean;
  onFollow?: () => void;
  onMenuPress?: () => void;
}

/**
 * PostHeader Molecule
 * Atomic Design: Molecule - Composed of Avatar, Username, FollowButton, IconButton
 * Single Responsibility: Display post author info and actions
 * SOLID: Open/Closed - Styles from theme
 */
export const PostHeader: React.FC<PostHeaderProps> = ({
  authorName,
  authorAvatar,
  isFollowing,
  onFollow,
  onMenuPress,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: postHeader.paddingHorizontal,
      paddingVertical: postHeader.paddingVertical,
    }),
    [],
  );

  const authorSectionStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    }),
    [],
  );

  const avatarRingStyle = useMemo<ViewStyle>(
    () => ({
      padding: postHeader.avatarRingPadding,
      borderRadius: postHeader.avatarRingBorderRadius,
      borderWidth: postHeader.avatarRingBorderWidth,
      borderColor: `${theme.colors.primary}50`,
    }),
    [],
  );

  const avatarStyle = useMemo<ImageStyle>(
    () => ({
      width: postHeader.avatarSize,
      height: postHeader.avatarSize,
      borderRadius: postHeader.avatarSize / 2,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const usernameStyle = useMemo<TextStyle>(
    () => ({
      marginLeft: postHeader.usernameMarginLeft,
      fontSize: postHeader.usernameFontSize,
      fontWeight: postHeader.usernameFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const actionsStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={authorSectionStyle}>
        <View style={avatarRingStyle}>
          <Image source={{ uri: authorAvatar }} style={avatarStyle} />
        </View>
        <Text style={usernameStyle} numberOfLines={1}>
          {authorName}
        </Text>
      </View>

      <View style={actionsStyle}>
        <FollowButton isFollowing={isFollowing} onPress={onFollow} />
        <IconButton
          icon={faEllipsisVertical}
          size={postMenuButton.iconSize}
          color={theme.colors.gray700}
          onPress={onMenuPress}
          padding={postMenuButton.padding}
        />
      </View>
    </View>
  );
};
