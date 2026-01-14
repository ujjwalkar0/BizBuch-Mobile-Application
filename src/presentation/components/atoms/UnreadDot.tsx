import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { unreadDot } = theme.components;

interface UnreadDotProps {
  visible: boolean;
}

/**
 * UnreadDot Atom
 * Atomic Design: Atom - Small dot indicator for unread state
 * Single Responsibility: Display unread indicator
 * SOLID: Open/Closed - Styles from theme
 */
export const UnreadDot: React.FC<UnreadDotProps> = ({ visible }) => {
  const dotStyle = useMemo<ViewStyle>(
    () => ({
      width: unreadDot.size,
      height: unreadDot.size,
      borderRadius: unreadDot.size / 2,
      backgroundColor: theme.colors.primary,
      marginLeft: unreadDot.marginLeft,
    }),
    [],
  );

  if (!visible) return null;

  return <View style={dotStyle} />;
};
