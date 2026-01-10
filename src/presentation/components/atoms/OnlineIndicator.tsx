import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface OnlineIndicatorProps {
  isOnline: boolean;
}

/**
 * OnlineIndicator Atom
 * Atomic Design: Atom - Visual indicator for online status
 */
export const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({
  isOnline,
}) => {
  if (!isOnline) return null;

  return <View style={styles.onlineDot} />;
};

const styles = StyleSheet.create({
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
});
