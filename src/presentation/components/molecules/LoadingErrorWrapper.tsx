import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { theme } from '../../theme';

const { loadingErrorWrapper } = theme.components;

interface LoadingErrorWrapperProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  children: React.ReactNode;
  errorMessage?: string;
}

/**
 * LoadingErrorWrapper Molecule
 * Atomic Design: Molecule - Composed of LoadingSpinner atom + error UI
 * Single Responsibility: Handle loading and error states for content
 * SOLID: Open/Closed - Styles from theme, customizable error message
 * SOLID: Dependency Inversion - Uses LoadingSpinner atom
 */
export const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  isLoading,
  isError,
  onRetry,
  children,
  errorMessage = 'Failed to load data',
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const errorTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: loadingErrorWrapper.errorFontSize,
      color: theme.colors.gray600,
      marginBottom: loadingErrorWrapper.errorMarginBottom,
    }),
    [],
  );

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.blue500,
      paddingHorizontal: loadingErrorWrapper.buttonPaddingHorizontal,
      paddingVertical: loadingErrorWrapper.buttonPaddingVertical,
      borderRadius: loadingErrorWrapper.buttonBorderRadius,
    }),
    [],
  );

  const buttonTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontWeight: loadingErrorWrapper.buttonFontWeight,
    }),
    [],
  );

  if (isLoading) {
    return (
      <View style={containerStyle}>
        <LoadingSpinner size="large" color={theme.colors.blue500} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={containerStyle}>
        <Text style={errorTextStyle}>{errorMessage}</Text>
        <TouchableOpacity onPress={onRetry} style={buttonStyle} activeOpacity={0.7}>
          <Text style={buttonTextStyle}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};
