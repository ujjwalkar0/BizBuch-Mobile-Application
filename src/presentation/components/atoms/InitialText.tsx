import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface InitialTextProps {
  children: string;
  size?: number;
  color?: string;
}

/**
 * InitialText Atom
 * Atomic Design: Atom - Pure text element for displaying initials
 * Single Responsibility: Display single letter/character
 */
export const InitialText: React.FC<InitialTextProps> = ({
  children,
  size = 18,
  color = theme.colors.primary,
}) => {
  return (
    <Text style={[styles.text, { fontSize: size, color } as TextStyle]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
  },
});
