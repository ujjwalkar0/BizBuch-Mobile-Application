import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { activityLogHeader } = theme.components;

interface ActivityLogHeaderProps {
  onBack: () => void;
}

/**
 * ActivityLogHeader Molecule
 * Atomic Design: Molecule - Header with back button and title
 * Single Responsibility: Display activity log screen header
 * SOLID: Open/Closed - Styles from theme
 */
export const ActivityLogHeader: React.FC<ActivityLogHeaderProps> = ({ onBack }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      height: activityLogHeader.height,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: activityLogHeader.paddingHorizontal,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const backButtonStyle = useMemo<ViewStyle>(
    () => ({
      padding: activityLogHeader.backButtonPadding,
      marginRight: activityLogHeader.backButtonMarginRight,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: activityLogHeader.titleFontSize,
      fontWeight: activityLogHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={backButtonStyle} onPress={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color={theme.colors.gray700} />
      </TouchableOpacity>
      <Text style={titleStyle}>Activity Log</Text>
    </View>
  );
};
