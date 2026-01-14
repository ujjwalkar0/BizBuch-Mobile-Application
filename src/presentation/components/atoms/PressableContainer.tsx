import React, { useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { pressableContainer } = theme.components;

interface PressableContainerProps {
  children: React.ReactNode;
  onPress: () => void;
  activeOpacity?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

/**
 * PressableContainer Atom
 * Atomic Design: Atom - Touchable wrapper with consistent behavior
 * Single Responsibility: Provide pressable area for content
 * SOLID: Open/Closed - Styles from theme
 */
export const PressableContainer: React.FC<PressableContainerProps> = ({
  children,
  onPress,
  activeOpacity = pressableContainer.activeOpacity,
  style,
  disabled = false,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: pressableContainer.flexDirection,
      alignItems: pressableContainer.alignItems,
    }),
    [],
  );

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};
