import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface BannerSpinnerProps {
  color?: string;
}

/**
 * BannerSpinner Atom
 * Atomic Design: Atom - Loading indicator for banners
 */
export const BannerSpinner: React.FC<BannerSpinnerProps> = ({
  color = '#fff',
}) => {
  return (
    <ActivityIndicator size="small" color={color} style={styles.spinner} />
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginRight: 8,
  },
});
