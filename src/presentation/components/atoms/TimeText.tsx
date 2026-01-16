import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { timeText } = theme.components;

interface TimeTextProps {
  children: string;
  isHighlighted?: boolean;
}

/**
 * TimeText Atom
 * Atomic Design: Atom - Displays timestamp text
 * Single Responsibility: Show time with optional highlight
 * SOLID: Open/Closed - Styles from theme
 */
export const TimeText: React.FC<TimeTextProps> = ({
  children,
  isHighlighted = false,
}) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: timeText.fontSize,
      color: isHighlighted ? theme.colors.primary : theme.colors.gray400,
      fontWeight: isHighlighted ? timeText.highlightedFontWeight : 'normal',
    }),
    [isHighlighted],
  );

  return <Text style={textStyle}>{children}</Text>;
};
