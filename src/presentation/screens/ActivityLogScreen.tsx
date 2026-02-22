import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { ActivityLogScreenTemplate } from '../components/templates/ActivityLogScreenTemplate';
import { useActivityLog } from '../../application/query/useActivityLog';

type ActivityLogScreenProps = NativeStackScreenProps<RootStackParamList, 'ActivityLog'>;

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
