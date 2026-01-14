import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { bannerText } = theme.components;

interface BannerTextProps {
  children: string;
  variant?: 'primary' | 'secondary';
  style?: TextStyle;
}

/**
 * BannerText Atom
 * Atomic Design: Atom - Basic text element for banners
 * SOLID: Open/Closed - Styles from theme
 */
export const BannerText: React.FC<BannerTextProps> = ({
  children,
  variant = 'primary',
  style,
}) => {
  const textStyle = useMemo<TextStyle>(() => {
    const base: TextStyle = {
      color: theme.colors.white,
      fontSize: bannerText.primary.fontSize,
      fontWeight: bannerText.primary.fontWeight,
      textAlign: 'center',
    };

    if (variant === 'secondary') {
      return {
        ...base,
        color: `rgba(255, 255, 255, ${bannerText.secondary.opacity})`,
        fontSize: bannerText.secondary.fontSize,
        fontWeight: bannerText.secondary.fontWeight,
        marginTop: bannerText.secondary.marginTop,
      };
    }

    return base;
  }, [variant]);

  return <Text style={[textStyle, style]}>{children}</Text>;
};
