import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { faUserPlus, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { ActionButton } from '../atoms/ActionButton';
import { theme } from '../../theme';

const { connectionActions } = theme.components;

interface ConnectionActionsProps {
  isSuggestion: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onMessage: () => void;
  onViewProfile: () => void;
}

/**
 * ConnectionActions Molecule
 * Atomic Design: Molecule - Action buttons row for connection card
 * SOLID: Single Responsibility - Handle connection action buttons
 * SOLID: Open/Closed - Styles from theme
 * Reuses: ActionButton atom
 */
export const ConnectionActions: React.FC<ConnectionActionsProps> = ({
  isSuggestion,
  isConnecting,
  onConnect,
  onMessage,
  onViewProfile,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      gap: connectionActions.gap,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {isSuggestion ? (
        <ActionButton
          label={isConnecting ? 'Connecting...' : 'Connect'}
          icon={faUserPlus}
          variant="primary"
          onPress={onConnect}
          disabled={isConnecting}
        />
      ) : (
        <ActionButton
          label="Message"
          icon={faMessage}
          variant="secondary"
          onPress={onMessage}
        />
      )}

      <ActionButton
        label="Profile"
        icon={faUser}
        variant="outline"
        onPress={onViewProfile}
      />
    </View>
  );
};
