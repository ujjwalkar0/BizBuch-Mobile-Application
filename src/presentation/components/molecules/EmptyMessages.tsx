import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { EmptyState } from './EmptyState';
import { theme } from '../../theme';

const { emptyMessages } = theme.components;

interface EmptyMessagesProps {
  style?: ViewStyle;
}

/**
 * EmptyMessages Molecule
 * Atomic Design: Molecule - Empty state for message list
 * Single Responsibility: Display when no messages exist
 * SOLID: Open/Closed - Styles from theme
 */
export const EmptyMessages: React.FC<EmptyMessagesProps> = ({ style }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingTop: emptyMessages.paddingTop,
      ...style,
    }),
    [style],
  );

  return (
    <EmptyState
      message="No messages yet"
      subMessage="Send a message to start the conversation"
      style={containerStyle}
    />
  );
};
