import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { IconButton } from './IconButton';

interface BackButtonProps {
  onPress: () => void;
}

/**
 * BackButton Molecule
 * Atomic Design: Molecule - Composed of IconButton atom with back arrow
 */
export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <IconButton
      icon={faArrowLeft}
      size={20}
      color={theme.colors.primary}
      onPress={onPress}
      padding={6}
    />
  );
};

const styles = StyleSheet.create({
  // Removed - padding now handled by IconButton
});