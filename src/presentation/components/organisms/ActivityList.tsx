import React, { useMemo } from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { ActivityItem } from '../molecules/ActivityItem';
import { ActivityLog } from '../../../domain/activity/entities/ActivityLog';
import { EmptyState } from '../EmptyState';
import { theme } from '../../theme';

const { activityList } = theme.components;

interface ActivityListProps {
  activities: ActivityLog[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

/**
 * ActivityList Organism
 * Atomic Design: Organism - Composes ActivityItem molecules
 * Single Responsibility: Manage activity list rendering
 * SOLID: Open/Closed - Styles from theme
 */
export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isRefreshing,
  onRefresh,
}) => {
  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      flexGrow: 1,
      backgroundColor: theme.colors.background,
    }),
    [],
  );

  const renderItem = ({ item }: { item: ActivityLog }) => (
    <ActivityItem activity={item} />
  );

  const keyExtractor = (item: ActivityLog) => item.id.toString();

  if (activities.length === 0) {
    return (
      <EmptyState
        message="No activity yet"
        subMessage="Your activity will appear here"
      />
    );
  }

  return (
    <FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};
