import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme';

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
 */
export const GradientCircle: React.FC<GradientCircleProps> = ({
  children,
  size = 36,
  colors = [theme.colors.primary, theme.colors.primaryDark],
  style,
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
