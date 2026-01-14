import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ErrorText } from '../atoms/ErrorText';
import { theme } from '../../theme';

interface CenteredErrorProps {
  message: string;
  style?: ViewStyle;
}

/**
 * CenteredError Molecule
 * Atomic Design: Molecule - Centered error message container
 * Single Responsibility: Display full-screen centered error state
 */
export const CenteredError: React.FC<CenteredErrorProps> = ({
  message,
  style,
}) => {
  return (
    <View style={[styles.centered, style]}>
      <ErrorText>{message}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
  },
});
