import React, { useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { circleButton } = theme.components;

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
 * SOLID: Open/Closed - Styles from theme
 */
export const CircleButton: React.FC<CircleButtonProps> = ({
  onPress,
  disabled = false,
  size = circleButton.defaultSize,
  backgroundColor = 'transparent',
  children,
  style,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [size, backgroundColor],
  );

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
