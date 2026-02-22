import React, { useState, useCallback, useMemo } from 'react';
import { NotificationsScreenTemplate } from '../components/templates/NotificationsScreenTemplate';
import { Activity, NotificationTabType } from '../../domain/notification/entities/Activity';
import { NotificationFormatter } from '../../infrastructure/services/NotificationFormatter';
import { useNotifications } from '../../application/query/useNotifications';
import { useMarkAllNotificationsAsRead } from '../../application/command/useMarkAllNotificationsAsRead';
import { useMarkNotificationAsRead } from '../../application/command/useMarkNotificationAsRead';

export const NotificationsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotificationTabType>('all');
  
  const { data, isLoading, isError, refetch, isRefetching } = useNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const notifications = data ?? [];

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter((n: any) => !n.is_read);
      case 'mentions':
        return notifications.filter((n: any) => NotificationFormatter.isMention(n));
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const unreadCount = useMemo(
    () => notifications.filter((n: any) => !n.is_read).length,
    [notifications],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const handleNotificationPress = useCallback(
    (notification: Activity) => {
      if (!notification.is_read) {
        markAsReadMutation.mutate(notification.id);
      }
      // TODO: Navigate based on notification type/verb
    },
    [markAsReadMutation],
  );

  return (
    <NotificationsScreenTemplate
      notifications={filteredNotifications}
      isLoading={isLoading}
      isError={isError}
      isRefreshing={isRefetching}
      activeTab={activeTab}
      unreadCount={unreadCount}
      isMarkingAll={markAllAsReadMutation.isPending}
      onTabChange={setActiveTab}
      onMarkAllAsRead={handleMarkAllAsRead}
      onRefresh={handleRefresh}
      onNotificationPress={handleNotificationPress}
    />
  );
};
