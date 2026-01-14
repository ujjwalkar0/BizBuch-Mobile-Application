import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { onlineIndicator } = theme.components;

interface OnlineIndicatorProps {
  isOnline: boolean;
}

/**
 * OnlineIndicator Atom
 * Atomic Design: Atom - Visual indicator for online status
 * SOLID: Open/Closed - Styles from theme
 */
export const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({
  isOnline,
}) => {
  const dotStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      bottom: 1,
      right: 1,
      width: onlineIndicator.size,
      height: onlineIndicator.size,
      borderRadius: onlineIndicator.size / 2,
      backgroundColor: onlineIndicator.color,
      borderWidth: onlineIndicator.borderWidth,
      borderColor: theme.colors.white,
    }),
    [],
  );

  if (!isOnline) return null;

  return <View style={dotStyle} />;
};
