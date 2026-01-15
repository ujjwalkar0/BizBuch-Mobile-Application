import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../../theme';

const { postActionIcon } = theme.components;

interface PostActionIconProps {
  icon: any;
  onPress?: () => void;
  size?: number;
  color?: string;
  count?: number;
  isActive?: boolean;
  activeColor?: string;
}

/**
 * PostActionIcon Atom
 * Atomic Design: Atom - Single action icon with optional count
 * Single Responsibility: Display tappable action icon
 * SOLID: Open/Closed - Styles from theme
 */
export const PostActionIcon: React.FC<PostActionIconProps> = ({
  icon,
  onPress,
  size = postActionIcon.defaultSize,
  color = theme.colors.gray700,
  count,
  isActive = false,
  activeColor = theme.colors.primary,
}) => {
  const iconColor = isActive ? activeColor : color;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      padding: postActionIcon.padding,
      gap: count !== undefined && count > 0 ? postActionIcon.countGap : 0,
    }),
    [count],
  );

  const countStyle = useMemo<TextStyle>(
    () => ({
      fontSize: postActionIcon.countFontSize,
      fontWeight: postActionIcon.countFontWeight,
      color: theme.colors.gray700,
    }),
    [],
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <FontAwesomeIcon icon={icon} size={size} color={iconColor} />
      {count !== undefined && count > 0 && (
        <Text style={countStyle}>{count}</Text>
      )}
    </TouchableOpacity>
  );
};
