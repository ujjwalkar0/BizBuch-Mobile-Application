import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BannerContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

/**
 * BannerContainer Molecule
 * Atomic Design: Molecule - Layout wrapper for banner content
 * Single Responsibility: Provide consistent banner layout
 */
export const BannerContainer: React.FC<BannerContainerProps> = ({
  children,
  backgroundColor,
  style,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
