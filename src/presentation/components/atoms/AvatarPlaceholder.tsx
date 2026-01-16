import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { InitialText } from './InitialText';

interface AvatarPlaceholderProps {
  initial: string;
  size?: number;
  backgroundColor?: string;
}

const { avatar } = theme.components;

/**
 * AvatarPlaceholder Atom
 * Atomic Design: Atom - Circular placeholder with initial letter
 * Single Responsibility: Display placeholder when no photo available
 * SOLID: Open/Closed - Styles from theme
 */
export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  initial,
  size = avatar.defaultSize,
  backgroundColor = `${theme.colors.primary}${avatar.placeholder.backgroundOpacity}`,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [size, backgroundColor],
  );

  const fontSize = size * avatar.placeholder.fontSizeRatio;

  return (
    <View style={containerStyle}>
      <InitialText size={fontSize}>{initial}</InitialText>
    </View>
  );
};
