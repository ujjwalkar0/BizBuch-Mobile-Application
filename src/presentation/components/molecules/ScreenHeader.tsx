import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { screenHeader } = theme.components;

interface ScreenHeaderProps {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * ScreenHeader Molecule
 * Atomic Design: Molecule - Header with title and optional children
 * Single Responsibility: Display screen header with title
 * SOLID: Open/Closed - Extensible via children and style props, styles from theme
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  children,
  style,
}) => {
  const headerStyle = useMemo<ViewStyle>(
    () => ({
      padding: screenHeader.padding,
      backgroundColor: theme.colors.white,
      borderBottomWidth: screenHeader.borderBottomWidth,
      borderBottomColor: theme.colors.border,
      ...((style as object) || {}),
    }),
    [style],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: screenHeader.titleFontSize,
      fontWeight: screenHeader.titleFontWeight,
      marginBottom: screenHeader.titleMarginBottom,
      color: theme.colors.gray900,
    }),
    [],
  );

  return (
    <View style={headerStyle}>
      <Text style={titleStyle}>{title}</Text>
      {children}
    </View>
  );
};
