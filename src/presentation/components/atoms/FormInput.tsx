import React, { useMemo } from 'react';
import { View, Text, TextInput, TextStyle, ViewStyle, KeyboardTypeOptions } from 'react-native';
import { theme } from '../../theme';

const { formInput } = theme.components;

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
}

/**
 * FormInput Atom
 * Atomic Design: Atom - Reusable form input with label and error
 * Single Responsibility: Display labeled text input with validation error
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      marginBottom: 20,
    }),
    [],
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: formInput.labelFontSize,
      fontWeight: formInput.labelFontWeight,
      color: theme.colors.gray700,
      marginBottom: formInput.labelMarginBottom,
    }),
    [],
  );

  const inputStyle = useMemo<TextStyle>(
    () => ({
      borderWidth: formInput.borderWidth,
      borderColor: error ? theme.colors.red500 : theme.colors.gray300,
      borderRadius: formInput.borderRadius,
      paddingHorizontal: formInput.paddingHorizontal,
      paddingVertical: formInput.paddingVertical,
      fontSize: formInput.fontSize,
      color: theme.colors.gray900,
      backgroundColor: theme.colors.white,
      ...(multiline && {
        height: numberOfLines * 25,
        textAlignVertical: 'top' as const,
        paddingTop: formInput.paddingVertical,
      }),
    }),
    [error, multiline, numberOfLines],
  );

  const errorStyle = useMemo<TextStyle>(
    () => ({
      fontSize: formInput.errorFontSize,
      color: theme.colors.red500,
      marginTop: formInput.errorMarginTop,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>
        {label}
        {required && ' *'}
      </Text>
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray400}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
      />
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};
