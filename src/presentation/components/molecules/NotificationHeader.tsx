import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { notificationHeader } = theme.components;

interface NotificationHeaderProps {
  onMarkAllAsRead: () => void;
  isMarkingAll?: boolean;
}

/**
 * NotificationHeader Molecule
 * Atomic Design: Molecule - Header with title and mark all as read button
 * Single Responsibility: Display notification screen header
 * SOLID: Open/Closed - Styles from theme
 */
export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  onMarkAllAsRead,
  isMarkingAll = false,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      height: notificationHeader.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: notificationHeader.paddingHorizontal,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: notificationHeader.titleFontSize,
      fontWeight: notificationHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      padding: notificationHeader.buttonPadding,
      opacity: isMarkingAll ? 0.5 : 1,
    }),
    [isMarkingAll],
  );

  const buttonTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: notificationHeader.buttonFontSize,
      color: theme.colors.primary,
      marginLeft: notificationHeader.buttonIconMargin,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Notifications</Text>
      <TouchableOpacity
        style={buttonStyle}
        onPress={onMarkAllAsRead}
        disabled={isMarkingAll}
      >
        <FontAwesomeIcon
          icon={faCheckDouble}
          size={notificationHeader.buttonIconSize}
          color={theme.colors.primary}
        />
        <Text style={buttonTextStyle}>Mark all read</Text>
      </TouchableOpacity>
    </View>
  );
};
