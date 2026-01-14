import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { cardSubtitle } = theme.components;

interface CardSubtitleProps {
  children: string;
  numberOfLines?: number;
  style?: TextStyle;
}

/**
 * CardSubtitle Atom
 * Atomic Design: Atom - Subtitle text element for cards
 * Single Responsibility: Display card subtitle with consistent styling
 * SOLID: Open/Closed - Styles from theme
 */
export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  numberOfLines = 2,
  style,
}) => {
  const subtitleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: cardSubtitle.fontSize,
      color: theme.colors.gray600,
      lineHeight: cardSubtitle.lineHeight,
    }),
    [],
  );

  return (
    <Text style={[subtitleStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
