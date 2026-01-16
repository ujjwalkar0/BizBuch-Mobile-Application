import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { verticalIconButton } = theme.components;

interface VerticalIconButtonProps {
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
 * VerticalIconButton Atom
 * Atomic Design: Atom - Reusable vertical icon button with label below
 * Single Responsibility: Display tappable icon with label in column layout
 * SOLID: Open/Closed - Customizable via props, styles from theme
 */
export const VerticalIconButton: React.FC<VerticalIconButtonProps> = ({
  icon,
  label,
  iconColor = theme.colors.gray600,
  textColor = theme.colors.gray600,
  iconSize = verticalIconButton.iconSize,
  fontSize = verticalIconButton.fontSize,
  onPress,
  disabled = false,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      alignItems: 'center',
      justifyContent: 'center',
      padding: verticalIconButton.padding,
      opacity: disabled ? 0.5 : 1,
    }),
    [disabled],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      marginTop: verticalIconButton.labelMarginTop,
      fontSize,
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
