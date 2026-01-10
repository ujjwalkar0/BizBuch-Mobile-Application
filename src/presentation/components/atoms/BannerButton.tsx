import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface BannerButtonProps {
  onPress: () => void;
  label: string;
}

/**
 * BannerButton Atom
 * Atomic Design: Atom - Basic button element for banners
 */
export const BannerButton: React.FC<BannerButtonProps> = ({
  onPress,
  label,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
