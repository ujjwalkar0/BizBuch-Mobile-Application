import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { bannerContainer } = theme.components;

interface BannerContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

/**
 * BannerContainer Molecule
 * Atomic Design: Molecule - Layout wrapper for banner content
 * Single Responsibility: Provide consistent banner layout
 * SOLID: Open/Closed - Styles from theme
 */
export const BannerContainer: React.FC<BannerContainerProps> = ({
  children,
  backgroundColor,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: bannerContainer.paddingVertical,
      paddingHorizontal: bannerContainer.paddingHorizontal,
      backgroundColor,
    }),
    [backgroundColor],
  );

  return <View style={[containerStyle, style]}>{children}</View>;
};
