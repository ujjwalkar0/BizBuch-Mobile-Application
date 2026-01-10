import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

/**
 * LoadingSpinner Atom
 * Atomic Design: Atom - Basic loading indicator
 * Single Responsibility: Display a spinner
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
}) => {
  return <ActivityIndicator size={size} color={color} />;
};
