import React, { useMemo } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { NotificationIcon } from '../atoms/NotificationIcon';
import { NotificationMessage } from '../atoms/NotificationMessage';
import { ActivityTimestamp } from '../atoms/ActivityTimestamp';
import { UnreadDot } from '../atoms/UnreadDot';
import { Activity } from '../../../domain/notification/entities/Activity';
import { NotificationFormatter } from '../../../data/services/NotificationFormatter';
import { theme } from '../../theme';

const { notificationItem } = theme.components;

interface NotificationItemProps {
  notification: Activity;
  onPress?: () => void;
}

/**
 * NotificationItem Molecule
 * Atomic Design: Molecule - Composes NotificationIcon, NotificationMessage, ActivityTimestamp atoms
 * Single Responsibility: Display single notification entry
 * SOLID: Open/Closed - Styles from theme, formatting from service
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const displayInfo = useMemo(
    () => NotificationFormatter.getDisplayInfo(notification),
    [notification],
  );

  const formattedTime = useMemo(
    () => NotificationFormatter.formatTime(notification.created_at),
    [notification.created_at],
  );

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: notificationItem.paddingVertical,
      paddingHorizontal: notificationItem.paddingHorizontal,
      backgroundColor: notification.is_read
        ? theme.colors.white
        : notificationItem.unreadBackgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [notification.is_read],
  );

  const contentStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      marginLeft: notificationItem.contentMarginLeft,
    }),
    [],
  );

  const rowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
    }),
    [],
  );

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.7}>
      <NotificationIcon icon={displayInfo.icon} color={displayInfo.color} />
      <View style={contentStyle}>
        <NotificationMessage text={displayInfo.message} isRead={notification.is_read} />
        <View style={rowStyle}>
          <ActivityTimestamp time={formattedTime} />
          <UnreadDot visible={!notification.is_read} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
