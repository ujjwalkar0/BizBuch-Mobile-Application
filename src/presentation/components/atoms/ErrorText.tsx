import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { errorText } = theme.components;

interface ErrorTextProps {
  children: string;
  style?: TextStyle;
}

/**
 * ErrorText Atom
 * Atomic Design: Atom - Basic error text element
 * Single Responsibility: Display error messages
 * SOLID: Open/Closed - Styles from theme
 */
export const ErrorText: React.FC<ErrorTextProps> = ({ children, style }) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: errorText.fontSize,
      color: theme.colors.gray500,
    }),
    [],
  );

  return <Text style={[textStyle, style]}>{children}</Text>;
};
