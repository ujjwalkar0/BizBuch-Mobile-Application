import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

interface ViewProfileHeaderProps {
  title?: string;
  onBack: () => void;
}

/**
 * ViewProfileHeader Molecule
 * Atomic Design: Molecule - Profile screen header with back button
 * SOLID: Single Responsibility - Display header with navigation
 */
export const ViewProfileHeader: React.FC<ViewProfileHeaderProps> = ({
  title = 'Profile',
  onBack,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    }),
    [],
  );

  const backButtonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    }),
    [],
  );

  const backTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 15,
      color: theme.colors.primary,
      fontWeight: '500',
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 17,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const placeholderStyle = useMemo<ViewStyle>(
    () => ({
      width: 70,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onBack} style={backButtonStyle}>
        <FontAwesomeIcon icon={faArrowLeft} size={18} color={theme.colors.primary} />
        <Text style={backTextStyle}>Back</Text>
      </TouchableOpacity>
      <Text style={titleStyle}>{title}</Text>
      <View style={placeholderStyle} />
    </View>
  );
};
