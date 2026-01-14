import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { BannerButton } from '../atoms/BannerButton';
import { theme } from '../../theme';

const { bannerActions } = theme.components;

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
 * SOLID: Open/Closed - Styles from theme
 * Reuses: BannerButton atom
 */
export const BannerActions: React.FC<BannerActionsProps> = ({ actions }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      gap: bannerActions.gap,
    }),
    [],
  );

  if (actions.length === 0) return null;

  return (
    <View style={containerStyle}>
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
