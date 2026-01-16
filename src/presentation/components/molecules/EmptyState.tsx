import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { emptyState } = theme.components;

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  style?: ViewStyle;
}

/**
 * EmptyState Molecule
 * Atomic Design: Molecule - Text display for empty content states
 * Single Responsibility: Display empty state message with optional sub-message
 * SOLID: Open/Closed - Styles from theme, customizable via props
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subMessage,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: emptyState.paddingVertical,
    }),
    [],
  );

  const messageStyle = useMemo<TextStyle>(
    () => ({
      fontSize: emptyState.messageFontSize,
      fontWeight: emptyState.messageFontWeight,
      color: theme.colors.gray800,
      textAlign: 'center',
    }),
    [],
  );

  const subMessageStyle = useMemo<TextStyle>(
    () => ({
      fontSize: emptyState.subMessageFontSize,
      color: theme.colors.gray600,
      marginTop: emptyState.subMessageMarginTop,
      textAlign: 'center',
    }),
    [],
  );

  return (
    <View style={[containerStyle, style]}>
      <Text style={messageStyle}>{message}</Text>
      {subMessage && <Text style={subMessageStyle}>{subMessage}</Text>}
    </View>
  );
};
