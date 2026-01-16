import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { initialText } = theme.components;

interface InitialTextProps {
  children: string;
  size?: number;
  color?: string;
}

/**
 * InitialText Atom
 * Atomic Design: Atom - Pure text element for displaying initials
 * Single Responsibility: Display single letter/character
 * SOLID: Open/Closed - Styles from theme
 */
export const InitialText: React.FC<InitialTextProps> = ({
  children,
  size = initialText.defaultSize,
  color = theme.colors.primary,
}) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: size,
      color,
      fontWeight: initialText.fontWeight,
    }),
    [size, color],
  );

  return <Text style={textStyle}>{children}</Text>;
};
