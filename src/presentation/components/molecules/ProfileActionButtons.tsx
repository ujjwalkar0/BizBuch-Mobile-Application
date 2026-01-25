import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ProfileActionButtonsProps {
  isCurrentUser: boolean;
  onEditProfile?: () => void;
  onActivityLog?: () => void;
  onMessage?: () => void;
  onFollow?: () => void;
}

/**
 * ProfileActionButtons Molecule
 * Atomic Design: Molecule - Profile action buttons
 * SOLID: Single Responsibility - Display action buttons based on user context
 */
export const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  isCurrentUser,
  onEditProfile,
  onActivityLog,
  onMessage,
  onFollow,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 20,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const primaryButtonStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: 'center',
    }),
    [],
  );

  const primaryButtonTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontWeight: '600',
      fontSize: 15,
    }),
    [],
  );

  const secondaryButtonStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
    }),
    [],
  );

  const secondaryButtonTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 15,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {isCurrentUser ? (
        <>
          <TouchableOpacity style={primaryButtonStyle} onPress={onEditProfile}>
            <Text style={primaryButtonTextStyle}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={secondaryButtonStyle} onPress={onActivityLog}>
            <Text style={secondaryButtonTextStyle}>Activity Log</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={primaryButtonStyle} onPress={onFollow}>
            <Text style={primaryButtonTextStyle}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={secondaryButtonStyle} onPress={onMessage}>
            <Text style={secondaryButtonTextStyle}>Message</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
