import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { notificationIcon } = theme.components;

interface NotificationIconProps {
  icon: IconDefinition;
  color?: string;
  size?: number;
  containerSize?: number;
}

/**
 * NotificationIcon Atom
 * Atomic Design: Atom - Icon with circular background for notifications
 * Single Responsibility: Display notification type icon
 * SOLID: Open/Closed - Styles from theme
 */
export const NotificationIcon: React.FC<NotificationIconProps> = ({
  icon,
  color = theme.colors.primary,
  size = notificationIcon.defaultSize,
  containerSize: customContainerSize,
}) => {
  const actualContainerSize = customContainerSize ?? notificationIcon.containerSize;
  
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: actualContainerSize,
      height: actualContainerSize,
      borderRadius: actualContainerSize / 2,
      backgroundColor: `${color}${notificationIcon.backgroundOpacity}`,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [color, actualContainerSize],
  );

  return (
    <View style={containerStyle}>
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </View>
  );
};
