import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerButton } from '../atoms/BannerButton';

interface BannerAction {
  label: string;
  onPress: () => void;
}

interface BannerActionsProps {
  actions: BannerAction[];
}

/**
 * BannerActions Molecule
 * Atomic Design: Molecule - Composed of BannerButton atoms
 * Displays action buttons in a row
 * Reuses: BannerButton atom
 */
export const BannerActions: React.FC<BannerActionsProps> = ({ actions }) => {
  if (actions.length === 0) return null;

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <BannerButton
          key={index}
          label={action.label}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});
