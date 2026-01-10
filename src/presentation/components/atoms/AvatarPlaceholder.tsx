import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { InitialText } from './InitialText';

interface AvatarPlaceholderProps {
  initial: string;
  size?: number;
  backgroundColor?: string;
}

/**
 * AvatarPlaceholder Atom
 * Atomic Design: Atom - Circular placeholder with initial letter
 * Single Responsibility: Display placeholder when no photo available
 */
export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  initial,
  size = 42,
  backgroundColor = `${theme.colors.primary}20`,
}) => {
  const borderRadius = size / 2;
  const fontSize = size * 0.42;

  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius, backgroundColor } as ViewStyle,
      ]}
    >
      <InitialText size={fontSize}>{initial}</InitialText>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
