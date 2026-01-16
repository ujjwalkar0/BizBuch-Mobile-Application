import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme';

const { gradientCircle } = theme.components;

interface GradientCircleProps {
  children: React.ReactNode;
  size?: number;
  colors?: string[];
  style?: ViewStyle;
}

/**
 * GradientCircle Atom
 * Atomic Design: Atom - Circular container with gradient background
 * Single Responsibility: Display gradient circular wrapper
 * SOLID: Open/Closed - Styles from theme
 */
export const GradientCircle: React.FC<GradientCircleProps> = ({
  children,
  size = gradientCircle.defaultSize,
  colors = [theme.colors.primary, theme.colors.primaryDark],
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [size],
  );

  return (
    <LinearGradient
      colors={colors}
      style={[containerStyle, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};
