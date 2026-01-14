import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 18,
  color,
  onPress,
  padding = 8,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { padding }]}
      onPress={onPress}
      disabled={disabled || !onPress}
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
