import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { headerTitle } = theme.components;

interface HeaderTitleProps {
  children: string;
  numberOfLines?: number;
  style?: TextStyle;
}

/**
 * HeaderTitle Atom
 * Atomic Design: Atom - Basic title text element
 * SOLID: Open/Closed - Styles from theme
 */
export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  children,
  numberOfLines = 1,
  style,
}) => {
  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: headerTitle.fontSize,
      fontWeight: headerTitle.fontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  return (
    <Text style={[titleStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
