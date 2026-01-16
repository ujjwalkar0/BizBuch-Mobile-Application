import React, { useMemo } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { bannerSpinner } = theme.components;

interface BannerSpinnerProps {
  color?: string;
}

/**
 * BannerSpinner Atom
 * Atomic Design: Atom - Loading indicator for banners
 * SOLID: Open/Closed - Styles from theme
 */
export const BannerSpinner: React.FC<BannerSpinnerProps> = ({
  color = bannerSpinner.defaultColor,
}) => {
  const spinnerStyle = useMemo<ViewStyle>(
    () => ({
      marginRight: bannerSpinner.marginRight,
    }),
    [],
  );

  return (
    <ActivityIndicator size="small" color={color} style={spinnerStyle} />
  );
};
