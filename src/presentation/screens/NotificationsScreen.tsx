import React, { useState, useCallback, useMemo } from 'react';
import { NotificationsScreenTemplate } from '../components/templates/NotificationsScreenTemplate';
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from '../../ui/hooks/useNotifications';
import { Activity, NotificationTabType } from '../../domain/notification/entities/Activity';
import { NotificationFormatter } from '../../data/services/NotificationFormatter';

/**
 * NotificationsScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hooks and template
 * - Dependency Inversion: Depends on abstractions (hook, template)
 */
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
        return notifications.filter((n) => !n.is_read);
      case 'mentions':
        return notifications.filter((n) => NotificationFormatter.isMention(n));
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
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
