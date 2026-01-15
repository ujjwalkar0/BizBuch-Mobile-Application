import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { tabIcon } = theme.components;

interface TabIconProps {
  icon?: IconDefinition;
  color: string;
  size?: number;
}

/**
 * TabIcon Atom
 * Atomic Design: Atom - Simple icon display for tab navigation
 * Single Responsibility: Render navigation tab icon
 * SOLID: Open/Closed - Size and color customizable via props
 */
export const TabIcon: React.FC<TabIconProps> = ({
  icon,
  color,
  size = tabIcon.defaultSize,
}) => {
  if (!icon) {
    return null;
  }

  return <FontAwesomeIcon icon={icon} color={color} size={size} />;
};
