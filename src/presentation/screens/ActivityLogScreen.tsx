import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { ActivityLogScreenTemplate } from '../components/templates/ActivityLogScreenTemplate';
import { useActivityLog } from '../../ui/hooks/useActivityLog';

type ActivityLogScreenProps = NativeStackScreenProps<RootStackParamList, 'ActivityLog'>;

/**
 * ActivityLogScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hooks and template
 * - Dependency Inversion: Depends on abstractions (hook, template)
 */
export const ActivityLogScreen: React.FC<ActivityLogScreenProps> = ({ navigation }) => {
  const { data, isLoading, isError, refetch, isRefetching } = useActivityLog();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ActivityLogScreenTemplate
      activities={data ?? []}
      isLoading={isLoading}
      isError={isError}
      isRefreshing={isRefetching}
      onBack={handleBack}
      onRefresh={handleRefresh}
    />
  );
};
