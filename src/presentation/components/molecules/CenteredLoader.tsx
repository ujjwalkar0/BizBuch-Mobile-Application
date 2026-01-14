import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { theme } from '../../theme';

interface CenteredLoaderProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

/**
 * CenteredLoader Molecule
 * Atomic Design: Molecule - Centered loading spinner container
 * Single Responsibility: Display full-screen centered loading state
 * Reuses: LoadingSpinner atom
 */
export const CenteredLoader: React.FC<CenteredLoaderProps> = ({
  size = 'large',
  color,
  style,
}) => {
  return (
    <View style={[styles.centered, style]}>
      <LoadingSpinner size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
  },
});
