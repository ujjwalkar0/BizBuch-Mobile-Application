import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerText } from '../atoms/BannerText';

interface BannerMessageProps {
  primaryText: string;
  secondaryText?: string;
}

/**
 * BannerMessage Molecule
 * Atomic Design: Molecule - Composed of BannerText atoms
 * Displays primary and optional secondary message
 * Reuses: BannerText atom
 */
export const BannerMessage: React.FC<BannerMessageProps> = ({
  primaryText,
  secondaryText,
}) => {
  return (
    <View style={styles.container}>
      <BannerText>{primaryText}</BannerText>
      {secondaryText && (
        <BannerText variant="secondary">{secondaryText}</BannerText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
