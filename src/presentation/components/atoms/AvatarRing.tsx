import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { ring: ringConfig } = theme.components.avatar;

interface AvatarRingProps {
  children: React.ReactNode;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  padding?: number;
  style?: ViewStyle;
}

/**
 * AvatarRing Atom
 * Atomic Design: Atom - Circular border ring for avatar
 * Single Responsibility: Display circular border wrapper
 * SOLID: Open/Closed - Styles from theme
 */
export const AvatarRing: React.FC<AvatarRingProps> = ({
  children,
  size,
  borderColor = theme.colors.primary,
  borderWidth = ringConfig.borderWidth,
  padding = ringConfig.padding,
  style,
}) => {
  const ringStyle = useMemo<ViewStyle>(
    () => ({
      borderColor,
      borderWidth,
      padding,
      borderRadius: size
        ? (size + padding * 2 + borderWidth * 2) / 2
        : ringConfig.defaultBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [size, borderColor, borderWidth, padding],
  );

  return (
    <View style={[ringStyle, style]}>
      {children}
    </View>
  );
};
