import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

interface LogoutButtonProps {
  onPress: () => void;
}

/**
 * LogoutButton Molecule
 * Atomic Design: Molecule - Logout button with icon
 * SOLID: Single Responsibility - Display and handle logout action
 */
export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: 16,
      paddingVertical: 24,
      paddingBottom: 40,
    }),
    [],
  );

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 24,
      backgroundColor: theme.colors.white,
      borderWidth: 1.5,
      borderColor: '#dc2626',
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      color: '#dc2626',
      fontWeight: '600',
      fontSize: 15,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
        <FontAwesomeIcon icon={faSignOutAlt} size={16} color="#dc2626" />
        <Text style={textStyle}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
