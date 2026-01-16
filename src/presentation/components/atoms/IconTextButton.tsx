import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { iconTextButton } = theme.components;

interface IconTextButtonProps {
  icon: IconDefinition;
  label: string;
  iconColor?: string;
  textColor?: string;
  iconSize?: number;
  fontSize?: number;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * IconTextButton Atom
 * Atomic Design: Atom - Reusable button with icon and text
 * Single Responsibility: Display tappable icon with label
 * SOLID: Open/Closed - Customizable via props, styles from theme
 */
export const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  label,
  iconColor = theme.colors.gray600,
  textColor = theme.colors.gray700,
  iconSize = iconTextButton.iconSize,
  fontSize = iconTextButton.fontSize,
  onPress,
  disabled = false,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: iconTextButton.paddingVertical,
      paddingHorizontal: iconTextButton.paddingHorizontal,
      borderRadius: iconTextButton.borderRadius,
      opacity: disabled ? 0.5 : 1,
    }),
    [disabled],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      marginLeft: iconTextButton.textMarginLeft,
      fontSize,
      fontWeight: iconTextButton.fontWeight,
      color: textColor,
    }),
    [fontSize, textColor],
  );

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} />
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};
