import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '../atoms/IconButton';
import { HeaderAction } from '../organisms/ChatHeader';

interface HeaderActionsProps {
  actions: HeaderAction[];
}

/**
 * HeaderActions Molecule
 * Atomic Design: Molecule - Composed of multiple IconButton atoms
 */
export const HeaderActions: React.FC<HeaderActionsProps> = ({ actions }) => {
  return (
    <View style={styles.headerActions}>
      {actions.map(action => (
        <IconButton
          key={action.key}
          icon={action.icon}
          size={action.size}
          color={action.color}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
