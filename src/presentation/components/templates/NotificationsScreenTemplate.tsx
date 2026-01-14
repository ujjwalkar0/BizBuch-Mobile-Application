import React from 'react';
import { StyleSheet } from 'react-native';
import { NotificationHeader } from '../molecules/NotificationHeader';
import { NotificationTabs } from '../molecules/NotificationTabs';
import { NotificationList } from '../organisms/NotificationList';
import { CenteredLoader } from '../molecules/CenteredLoader';
import { CenteredError } from '../molecules/CenteredError';
import { Activity, NotificationTabType } from '../../../domain/notification/entities/Activity';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationsScreenTemplateProps {
  notifications: Activity[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  activeTab: NotificationTabType;
  unreadCount: number;
  isMarkingAll: boolean;
  onTabChange: (tab: NotificationTabType) => void;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  onNotificationPress: (notification: Activity) => void;
}

/**
 * NotificationsScreenTemplate
 * Atomic Design: Template - Page layout structure for notifications
 * SOLID Principles:
 * - Single Responsibility: Define visual structure only
 * - Open/Closed: Extended without modification
 * - Dependency Inversion: Depends on abstractions (organisms, molecules)
 */
export const NotificationsScreenTemplate: React.FC<NotificationsScreenTemplateProps> = ({
  notifications,
  isLoading,
  isError,
  isRefreshing,
  activeTab,
  unreadCount,
  isMarkingAll,
  onTabChange,
  onMarkAllAsRead,
  onRefresh,
  onNotificationPress,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <NotificationHeader onMarkAllAsRead={onMarkAllAsRead} />
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          unreadCount={unreadCount}
        />
        <CenteredLoader />
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <NotificationHeader onMarkAllAsRead={onMarkAllAsRead} />
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          unreadCount={unreadCount}
        />
        <CenteredError message="Failed to load notifications" />
      </SafeAreaView>
    );
  }

  // Success state
  return (
    <SafeAreaView style={styles.container}>
      <NotificationHeader
        onMarkAllAsRead={onMarkAllAsRead}
        isMarkingAll={isMarkingAll}
      />
      <NotificationTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        unreadCount={unreadCount}
      />
      <NotificationList
        notifications={notifications}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onNotificationPress={onNotificationPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
