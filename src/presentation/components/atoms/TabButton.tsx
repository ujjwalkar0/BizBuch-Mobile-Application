import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

const { tabButton } = theme.components;

interface TabButtonProps {
  label: string;
  icon?: IconDefinition;
  isActive: boolean;
  onPress: () => void;
}

/**
 * TabButton Atom
 * Atomic Design: Atom - Individual tab button with icon
 * Single Responsibility: Display single tab with active state
 * SOLID: Open/Closed - Styles from theme
 */
export const TabButton: React.FC<TabButtonProps> = ({
  label,
  icon,
  isActive,
  onPress,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: tabButton.paddingVertical,
      paddingHorizontal: tabButton.paddingHorizontal,
      borderRadius: tabButton.borderRadius,
      backgroundColor: isActive ? tabButton.activeBackgroundColor : 'transparent',
    }),
    [isActive],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      marginLeft: tabButton.iconMarginRight,
      fontSize: tabButton.fontSize,
      color: isActive ? theme.colors.primary : tabButton.inactiveColor,
      fontWeight: isActive ? tabButton.activeFontWeight : 'normal',
    }),
    [isActive],
  );

  const iconColor = isActive ? theme.colors.primary : tabButton.inactiveColor;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icon && (
        <FontAwesomeIcon icon={icon} size={tabButton.iconSize} color={iconColor} />
      )}
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};
