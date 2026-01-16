import React, { useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../../theme';

const { iconButton } = theme.components;

interface IconButtonProps {
  icon: any;
  size?: number;
  color?: string;
  onPress?: () => void;
  padding?: number;
  disabled?: boolean;
}

/**
 * IconButton Atom
 * Atomic Design: Atom - Reusable icon button component
 * SOLID: Open/Closed - Styles from theme
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = iconButton.defaultSize,
  color,
  onPress,
  padding = iconButton.defaultPadding,
  disabled = false,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      padding,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [padding],
  );

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || !onPress}
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};
