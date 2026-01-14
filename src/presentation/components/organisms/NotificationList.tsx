import React, { useMemo } from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { NotificationItem } from '../molecules/NotificationItem';
import { Activity } from '../../../domain/notification/entities/Activity';
import { EmptyState } from '../EmptyState';
import { theme } from '../../theme';

interface NotificationListProps {
  notifications: Activity[];
  isRefreshing: boolean;
  onRefresh: () => void;
  onNotificationPress?: (notification: Activity) => void;
}

/**
 * NotificationList Organism
 * Atomic Design: Organism - Composes NotificationItem molecules
 * Single Responsibility: Manage notification list rendering
 * SOLID: Open/Closed - Styles from theme
 */
export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isRefreshing,
  onRefresh,
  onNotificationPress,
}) => {
  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      flexGrow: 1,
      backgroundColor: theme.colors.background,
    }),
    [],
  );

  const renderItem = ({ item }: { item: Activity }) => (
    <NotificationItem
      notification={item}
      onPress={() => onNotificationPress?.(item)}
    />
  );

  const keyExtractor = (item: Activity) => item.id.toString();

  if (notifications.length === 0) {
    return (
      <EmptyState
        message="No notifications"
        subMessage="You're all caught up!"
      />
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};
