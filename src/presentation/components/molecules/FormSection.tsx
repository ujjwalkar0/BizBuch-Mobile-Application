import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { formSection } = theme.components;

interface FormSectionProps {
  title?: string;
  showSeparator?: boolean;
  children: React.ReactNode;
}

/**
 * FormSection Molecule
 * Atomic Design: Molecule - Groups related form fields with optional title
 * Single Responsibility: Organize form fields into logical sections
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  showSeparator = false,
  children,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      marginBottom: formSection.marginBottom,
    }),
    [],
  );

  const separatorStyle = useMemo<ViewStyle>(
    () => ({
      height: formSection.separatorHeight,
      backgroundColor: theme.colors.gray200,
      marginVertical: formSection.separatorMarginVertical,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: formSection.titleFontSize,
      fontWeight: formSection.titleFontWeight,
      color: theme.colors.gray900,
      marginBottom: formSection.titleMarginBottom,
      marginTop: formSection.titleMarginTop,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {showSeparator && <View style={separatorStyle} />}
      {title && <Text style={titleStyle}>{title}</Text>}
      {children}
    </View>
  );
};
