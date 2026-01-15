import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { badge } = theme.components;

interface BadgeProps {
  icon?: IconDefinition;
  text: string;
  iconColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

/**
 * Badge Atom
 * Atomic Design: Atom - Simple icon + text label display
 * Single Responsibility: Display badge with optional icon and text
 * SOLID: Open/Closed - Styles from theme, customizable via props
 */
export const Badge: React.FC<BadgeProps> = ({
  icon,
  text,
  iconColor = badge.defaultColor,
  textColor = badge.defaultColor,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: badge.gap,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: badge.fontSize,
      color: textColor,
    }),
    [textColor],
  );

  return (
    <View style={[containerStyle, style]}>
      {icon && (
        <FontAwesomeIcon icon={icon} size={badge.iconSize} color={iconColor} />
      )}
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};
