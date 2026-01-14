import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { EmptyState } from '../EmptyState';

interface EmptyMessagesProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * EmptyMessages Molecule
 * Atomic Design: Molecule - Empty state for message list
 * Single Responsibility: Display when no messages exist
 * Reuses: EmptyState component
 */
export const EmptyMessages: React.FC<EmptyMessagesProps> = ({ style }) => {
  return (
    <EmptyState
      message="No messages yet"
      subMessage="Send a message to start the conversation"
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});
