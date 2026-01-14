import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme, ButtonVariant } from '../../theme';

interface ActionButtonProps {
  label: string;
  icon: IconDefinition;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * ActionButton Atom
 * Atomic Design: Atom - Reusable action button with icon
 * Single Responsibility: Display tappable action with icon and label
 * SOLID: Open/Closed - Variants defined in theme, extensible without modification
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  variant = 'primary',
  onPress,
  disabled = false,
  style,
}) => {
  const variantConfig = theme.buttonVariants[variant];

  const buttonStyle: ViewStyle = {
    backgroundColor: variantConfig.backgroundColor,
    borderWidth: variantConfig.borderWidth,
    borderColor: variantConfig.borderColor,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <FontAwesomeIcon icon={icon} size={14} color={variantConfig.iconColor} />
      <Text style={[styles.text, { color: variantConfig.textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
