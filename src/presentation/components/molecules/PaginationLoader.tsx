import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

interface PaginationLoaderProps {
  isLoading: boolean;
}

/**
 * PaginationLoader Molecule
 * Atomic Design: Molecule - Loading indicator for pagination
 * Single Responsibility: Display loading state for infinite scroll
 * Reuses: LoadingSpinner atom
 */
export const PaginationLoader: React.FC<PaginationLoaderProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <LoadingSpinner size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
