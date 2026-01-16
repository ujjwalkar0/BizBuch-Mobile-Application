// src/presentation/screens/Network/NetworkScreen.tsx
/**
 * NetworkScreen Component (Page)
 *
 * Atomic Design: Page - Connects data layer to template
 * SOLID Principles Applied:
 * - Single Responsibility: Route handling and hook connection only
 * - Open/Closed: Extended through useNetworkScreen hook and NetworkScreenTemplate
 * - Dependency Inversion: Depends on abstracted hooks and templates
 */
import React from 'react';
import { NetworkScreenProps } from '../navigation/network-screen-navigation/NetworkScreenStackParamList';
import { useNetworkScreen } from '../../ui/hooks/useNetworkScreen';
import { NetworkScreenTemplate } from '../components/templates/NetworkScreenTemplate';

export const NetworkScreen: React.FC<NetworkScreenProps> = ({ navigation }) => {
  const {
    searchQuery,
    setSearchQuery,
    tab,
    setTab,
    connectingUserId,
    filteredData,
    connectedCount,
    isLoading,
    isError,
    isRefetching,
    handleRefetch,
    handleConnect,
  } = useNetworkScreen();

  return (
    <NetworkScreenTemplate
      isLoading={isLoading}
      isError={isError}
      isRefetching={isRefetching}
      data={filteredData}
      connectedCount={connectedCount}
      tab={tab}
      onTabChange={setTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      connectingUserId={connectingUserId}
      onRefresh={handleRefetch}
      onConnect={handleConnect}
      onViewProfile={(userId) => navigation.navigate('ViewProfile', { userId })}
      onChat={(userId) => navigation.navigate('Chat', { userId })}
    />
  );
};
