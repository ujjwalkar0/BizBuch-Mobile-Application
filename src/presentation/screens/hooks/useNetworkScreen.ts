import { useState, useCallback, useMemo } from 'react';
import { Connection } from '../../../domain/user/entities/Connection';
import { useSendConnectionRequest } from '../../../application/command/useToggleConnection';
import { useMyConnections } from '../../../application/query/useConnections';
import { useProfileSuggestions } from '../../../application/query/useProfileSuggestions';

interface UseNetworkScreenReturn {
  // State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tab: 'suggestions' | 'connections';
  setTab: (tab: 'suggestions' | 'connections') => void;
  connectingUserId: number | null;

  // Data
  filteredData: Connection[];
  connectedCount: number;

  // Loading states
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;

  // Actions
  handleRefetch: () => void;
  handleConnect: (userId: number) => void;
}

export const useNetworkScreen = (): UseNetworkScreenReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'suggestions' | 'connections'>('suggestions');
  const [connectingUserId, setConnectingUserId] = useState<number | null>(null);

  // Data fetching
  const {
    data: profiles = [],
    isLoading: isLoadingProfiles,
    isError: isErrorProfiles,
    refetch: refetchProfiles,
    isRefetching: isRefetchingProfiles,
  } = useProfileSuggestions();

  const {
    data: myConnections = [],
    isLoading: isLoadingConnections,
    isError: isErrorConnections,
    refetch: refetchConnections,
    isRefetching: isRefetchingConnections,
  } = useMyConnections();

  const sendConnectionRequestMutation = useSendConnectionRequest();

  // Derived states
  const isLoading = isLoadingProfiles || isLoadingConnections;
  const isError = isErrorProfiles || isErrorConnections;
  const isRefetching = isRefetchingProfiles || isRefetchingConnections;

  // Filtered data --> To Be implemented in the backend, this is just a placeholder for now
  const suggestions = useMemo(
    () => profiles.filter((p: Connection) => p),
    [profiles],
  );

  const currentData = tab === 'suggestions' ? suggestions : myConnections;

  const filteredData = useMemo(() => {
    if (!searchQuery) return currentData;

    const query = searchQuery.toLowerCase();
    return currentData.filter((c: Connection) => {
      return (
        c.display_name.toLowerCase().includes(query) ||
        (c.headline && c.headline.toLowerCase().includes(query))
      );
    });
  }, [currentData, searchQuery]);

  // Actions
  const handleRefetch = useCallback(() => {
    refetchProfiles();
    refetchConnections();
  }, [refetchProfiles, refetchConnections]);

  const handleConnect = useCallback(
    (userId: number) => {
      setConnectingUserId(userId);
      sendConnectionRequestMutation.mutate(userId, {
        onSettled: () => {
          setConnectingUserId(null);
        },
      });
    },
    [sendConnectionRequestMutation],
  );

  return {
    searchQuery,
    setSearchQuery,
    tab,
    setTab,
    connectingUserId,
    filteredData,
    connectedCount: myConnections.length,
    isLoading,
    isError,
    isRefetching,
    handleRefetch,
    handleConnect,
  };
};
