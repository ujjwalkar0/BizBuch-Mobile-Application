import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { cardTitle } = theme.components;

interface CardTitleProps {
  children: string;
  numberOfLines?: number;
  style?: TextStyle;
}

/**
 * CardTitle Atom
 * Atomic Design: Atom - Title text element for cards
 * Single Responsibility: Display card title with consistent styling
 * SOLID: Open/Closed - Styles from theme
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  numberOfLines = 1,
  style,
}) => {
  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: cardTitle.fontSize,
      fontWeight: cardTitle.fontWeight,
      color: theme.colors.gray900,
      marginBottom: cardTitle.marginBottom,
    }),
    [],
  );

  return (
    <Text style={[titleStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
