import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface CircleButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  backgroundColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * CircleButton Atom
 * Atomic Design: Atom - Reusable circular button container
 * Single Responsibility: Provide circular button with consistent styling
 */
export const CircleButton: React.FC<CircleButtonProps> = ({
  onPress,
  disabled = false,
  size = 44,
  backgroundColor = 'transparent',
  children,
  style,
}) => {
  const borderRadius = size / 2;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
