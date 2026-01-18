import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { editProfileHeader } = theme.components;

interface EditProfileHeaderProps {
  title: string;
  onBack: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

/**
 * EditProfileHeader Molecule
 * Atomic Design: Molecule - Header with back, title, and save action
 * Single Responsibility: Display edit profile header with actions
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({
  title,
  onBack,
  onSave,
  isSaving = false,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: editProfileHeader.paddingHorizontal,
      paddingVertical: editProfileHeader.paddingVertical,
      backgroundColor: theme.colors.white,
      borderBottomWidth: editProfileHeader.borderBottomWidth,
      borderBottomColor: theme.colors.gray200,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: editProfileHeader.titleFontSize,
      fontWeight: editProfileHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const saveButtonStyle = useMemo<TextStyle>(
    () => ({
      fontSize: editProfileHeader.saveButtonFontSize,
      fontWeight: editProfileHeader.saveButtonFontWeight,
      color: theme.colors.blue500,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onBack}>
        <FontAwesomeIcon
          icon={faTimes}
          size={editProfileHeader.closeIconSize}
          color={theme.colors.gray900}
        />
      </TouchableOpacity>

      <Text style={titleStyle}>{title}</Text>

      <TouchableOpacity onPress={onSave} disabled={isSaving}>
        {isSaving ? (
          <ActivityIndicator size="small" color={theme.colors.blue500} />
        ) : (
          <Text style={saveButtonStyle}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
