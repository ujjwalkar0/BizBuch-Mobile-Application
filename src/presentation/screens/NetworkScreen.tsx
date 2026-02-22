import React from 'react';
import { NetworkScreenProps } from '../navigation/network-screen-navigation/NetworkScreenStackParamList';
import { NetworkScreenTemplate } from '../components/templates/NetworkScreenTemplate';
import { useNetworkScreen } from './hooks/useNetworkScreen';

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
