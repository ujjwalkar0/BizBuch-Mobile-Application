import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface BannerTextProps {
  children: string;
  variant?: 'primary' | 'secondary';
  style?: TextStyle;
}

/**
 * BannerText Atom
 * Atomic Design: Atom - Basic text element for banners
 */
export const BannerText: React.FC<BannerTextProps> = ({
  children,
  variant = 'primary',
  style,
}) => {
  return (
    <Text
      style={[
        styles.baseText,
        variant === 'secondary' && styles.secondaryText,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
});
