import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { theme } from '../../theme';

const { centeredContainer } = theme.components;

interface CenteredLoaderProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

/**
 * CenteredLoader Molecule
 * Atomic Design: Molecule - Centered loading spinner container
 * Single Responsibility: Display full-screen centered loading state
 * SOLID: Open/Closed - Styles from theme
 * Reuses: LoadingSpinner atom
 */
export const CenteredLoader: React.FC<CenteredLoaderProps> = ({
  size = 'large',
  color,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: centeredContainer.flex,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.gray50,
    }),
    [],
  );

  return (
    <View style={[containerStyle, style]}>
      <LoadingSpinner size={size} color={color} />
    </View>
  );
};
