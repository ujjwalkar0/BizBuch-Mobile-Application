import React from 'react';
import { StyleSheet } from 'react-native';
import { PageHeader } from '../molecules/PageHeader';
import { ActivityList } from '../organisms/ActivityList';
import { CenteredLoader } from '../molecules/CenteredLoader';
import { CenteredError } from '../molecules/CenteredError';
import { ActivityLog } from '../../../domain/activity/entities/ActivityLog';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ActivityLogScreenTemplateProps {
  activities: ActivityLog[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  onBack: () => void;
  onRefresh: () => void;
}

/**
 * ActivityLogScreenTemplate
 * Atomic Design: Template - Page layout structure for activity log
 * SOLID Principles:
 * - Single Responsibility: Define visual structure only
 * - Open/Closed: Extended without modification
 * - Dependency Inversion: Depends on abstractions (organisms, molecules)
 */
export const ActivityLogScreenTemplate: React.FC<ActivityLogScreenTemplateProps> = ({
  activities,
  isLoading,
  isError,
  isRefreshing,
  onBack,
  onRefresh,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Activity Log" leftAction={{ type: 'back', onPress: onBack }} />
        <CenteredLoader />
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Activity Log" leftAction={{ type: 'back', onPress: onBack }} />
        <CenteredError message="Failed to load activity log" />
      </SafeAreaView>
    );
  }

  // Success state
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Activity Log" leftAction={{ type: 'back', onPress: onBack }} />
      <ActivityList
        activities={activities}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
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
