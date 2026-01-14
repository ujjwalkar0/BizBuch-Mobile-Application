import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

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
 */
export const AvatarRing: React.FC<AvatarRingProps> = ({
  children,
  size,
  borderColor = theme.colors.primary,
  borderWidth = 2,
  padding = 2,
  style,
}) => {
  return (
    <View
      style={[
        styles.ring,
        {
          borderColor,
          borderWidth,
          padding,
          borderRadius: size ? (size + padding * 2 + borderWidth * 2) / 2 : 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
