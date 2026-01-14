import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { activityIcon } = theme.components;

interface ActivityIconProps {
  icon: IconDefinition;
  color?: string;
  size?: number;
}

/**
 * ActivityIcon Atom
 * Atomic Design: Atom - Icon with circular background
 * Single Responsibility: Display activity type icon
 * SOLID: Open/Closed - Styles from theme
 */
export const ActivityIcon: React.FC<ActivityIconProps> = ({
  icon,
  color = theme.colors.primary,
  size = activityIcon.defaultSize,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: activityIcon.containerSize,
      height: activityIcon.containerSize,
      borderRadius: activityIcon.containerSize / 2,
      backgroundColor: `${color}${activityIcon.backgroundOpacity}`,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [color],
  );

  return (
    <View style={containerStyle}>
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </View>
  );
};
