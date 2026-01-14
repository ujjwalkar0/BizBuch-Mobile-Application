import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ErrorTextProps {
  children: string;
  style?: TextStyle;
}

/**
 * ErrorText Atom
 * Atomic Design: Atom - Basic error text element
 * Single Responsibility: Display error messages
 */
export const ErrorText: React.FC<ErrorTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: theme.colors.gray500,
  },
});
