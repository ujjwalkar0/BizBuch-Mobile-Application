import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { theme } from '../../theme';

const { paginationLoader } = theme.components;

interface PaginationLoaderProps {
  isLoading: boolean;
}

/**
 * PaginationLoader Molecule
 * Atomic Design: Molecule - Loading indicator for pagination
 * Single Responsibility: Display loading state for infinite scroll
 * SOLID: Open/Closed - Styles from theme
 * Reuses: LoadingSpinner atom
 */
export const PaginationLoader: React.FC<PaginationLoaderProps> = ({
  isLoading,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingVertical: paginationLoader.paddingVertical,
      alignItems: 'center',
    }),
    [],
  );

  if (!isLoading) return null;

  return (
    <View style={containerStyle}>
      <LoadingSpinner size="small" />
    </View>
  );
};
