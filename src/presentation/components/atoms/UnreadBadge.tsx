import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { unreadBadge } = theme.components;

interface UnreadBadgeProps {
  count: number;
  maxCount?: number;
}

/**
 * UnreadBadge Atom
 * Atomic Design: Atom - Displays unread count badge
 * Single Responsibility: Show unread message count
 * SOLID: Open/Closed - Styles from theme
 */
export const UnreadBadge: React.FC<UnreadBadgeProps> = ({
  count,
  maxCount = 99,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.primary,
      borderRadius: unreadBadge.borderRadius,
      minWidth: unreadBadge.minWidth,
      height: unreadBadge.height,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: unreadBadge.paddingHorizontal,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontSize: unreadBadge.fontSize,
      fontWeight: unreadBadge.fontWeight,
    }),
    [],
  );

  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{displayCount}</Text>
    </View>
  );
};
