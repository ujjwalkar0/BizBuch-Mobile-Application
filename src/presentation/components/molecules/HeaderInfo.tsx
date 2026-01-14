import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTitle } from '../atoms/HeaderTitle';
import { HeaderSubtitle } from '../atoms/HeaderSubtitle';

interface HeaderInfoProps {
  title: string;
  subtitle: string;
  subtitleVariant?: 'default' | 'typing' | 'online';
}

/**
 * HeaderInfo Molecule
 * Atomic Design: Molecule - Composed of HeaderTitle and HeaderSubtitle atoms
 */
export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  title,
  subtitle,
  subtitleVariant = 'default',
}) => {
  return (
    <View style={styles.headerInfo}>
      <HeaderTitle>{title}</HeaderTitle>
      {!!subtitle && (
        <HeaderSubtitle variant={subtitleVariant}>{subtitle}</HeaderSubtitle>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    flex: 1,
  },
});
