import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Connection } from '../../../domain/user/entities/Connection';
import { CenteredLoader } from '../molecules/CenteredLoader';
import { CenteredError } from '../molecules/CenteredError';
import { ConnectionList } from '../organisms/ConnectionList';

interface NetworkScreenTemplateProps {
  // Loading states
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;

  // Data
  data: Connection[];
  connectedCount: number;

  // Tab state
  tab: 'suggestions' | 'connections';
  onTabChange: (tab: 'suggestions' | 'connections') => void;

  // Search state
  searchQuery: string;
  onSearchChange: (query: string) => void;

  // Connection state
  connectingUserId: number | null;

  // Actions
  onRefresh: () => void;
  onConnect: (userId: number) => void;
  onViewProfile: (userId: number) => void;
  onChat: (userId: number) => void;
}

/**
 * NetworkScreenTemplate
 * Atomic Design: Template - Defines layout structure for network screen
 * SOLID: Single Responsibility - Layout orchestration only
 * SOLID: Open/Closed - Content passed via props
 */
export const NetworkScreenTemplate: React.FC<NetworkScreenTemplateProps> = ({
  isLoading,
  isError,
  isRefetching,
  data,
  connectedCount,
  tab,
  onTabChange,
  searchQuery,
  onSearchChange,
  connectingUserId,
  onRefresh,
  onConnect,
  onViewProfile,
  onChat,
}) => {
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CenteredLoader />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <CenteredError message="Failed to load connections" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ConnectionList
        data={data}
        isRefetching={isRefetching}
        onRefresh={onRefresh}
        tab={tab}
        connectingUserId={connectingUserId}
        onConnect={onConnect}
        onViewProfile={onViewProfile}
        onChat={onChat}
        connectedCount={connectedCount}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onTabChange={onTabChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
