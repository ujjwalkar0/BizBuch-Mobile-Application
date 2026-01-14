import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { BannerText } from '../atoms/BannerText';
import { theme } from '../../theme';

const { bannerMessage } = theme.components;

interface BannerMessageProps {
  primaryText: string;
  secondaryText?: string;
}

/**
 * BannerMessage Molecule
 * Atomic Design: Molecule - Composed of BannerText atoms
 * Displays primary and optional secondary message
 * SOLID: Open/Closed - Styles from theme
 * Reuses: BannerText atom
 */
export const BannerMessage: React.FC<BannerMessageProps> = ({
  primaryText,
  secondaryText,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: bannerMessage.flex,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <BannerText>{primaryText}</BannerText>
      {secondaryText && (
        <BannerText variant="secondary">{secondaryText}</BannerText>
      )}
    </View>
  );
};
