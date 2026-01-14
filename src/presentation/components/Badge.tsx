import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../theme';

const { badge } = theme.components;

interface BadgeProps {
  icon?: IconDefinition;
  text: string;
  iconColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

/**
 * Badge Molecule
 * Atomic Design: Molecule - Icon + Text combination
 * SOLID: Single Responsibility - Display badge with optional icon
 * SOLID: Open/Closed - Styles from theme, extensible via props
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
      marginLeft: badge.marginLeft,
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
