import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { ErrorText } from '../atoms/ErrorText';
import { theme } from '../../theme';

const { centeredContainer } = theme.components;

interface CenteredErrorProps {
  message: string;
  style?: ViewStyle;
}

/**
 * CenteredError Molecule
 * Atomic Design: Molecule - Centered error message container
 * Single Responsibility: Display full-screen centered error state
 * SOLID: Open/Closed - Styles from theme
 */
export const CenteredError: React.FC<CenteredErrorProps> = ({
  message,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: centeredContainer.flex,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.gray50,
    }),
    [],
  );

  return (
    <View style={[containerStyle, style]}>
      <ErrorText>{message}</ErrorText>
    </View>
  );
};
