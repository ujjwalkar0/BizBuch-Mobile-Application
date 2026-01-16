import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { IconButton } from '../atoms/IconButton';
import { HeaderAction } from '../organisms/ChatHeader';
import { theme } from '../../theme';

const { headerActions } = theme.components;

interface HeaderActionsProps {
  actions: HeaderAction[];
}

/**
 * HeaderActions Molecule
 * Atomic Design: Molecule - Composed of multiple IconButton atoms
 * SOLID: Open/Closed - Styles from theme
 */
export const HeaderActions: React.FC<HeaderActionsProps> = ({ actions }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: headerActions.gap,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
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
