import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { EmptyState } from '../EmptyState';

interface EmptyMessagesProps {
  style?: ViewStyle;
}

/**
 * EmptyMessages Molecule
 * Atomic Design: Molecule - Empty state for message list
 * Single Responsibility: Display when no messages exist
 * Open/Closed: Customizable via style prop
 */
export const EmptyMessages: React.FC<EmptyMessagesProps> = ({ style }) => {
  return (
    <EmptyState
      message="No messages yet"
      subMessage="Send a message to start the conversation"
      style={{ ...styles.container, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});
