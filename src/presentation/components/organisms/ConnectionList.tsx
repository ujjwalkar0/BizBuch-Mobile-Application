import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Connection } from '../../../domain/user/entities/Connection';
import { ConnectionCard } from './ConnectionCard';
import { EmptyState } from '../molecules/EmptyState';
import { NetworkListHeader } from '../molecules/NetworkListHeader';

interface ConnectionListProps {
  data: Connection[];
  isRefetching: boolean;
  onRefresh: () => void;
  tab: 'suggestions' | 'connections';
  connectingUserId: number | null;
  onConnect: (userId: number) => void;
  onViewProfile: (userId: number) => void;
  onChat: (userId: number) => void;
  // Header props
  connectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: 'suggestions' | 'connections') => void;
}

/**
 * ConnectionList Organism
 * Atomic Design: Organism - FlatList with ConnectionCard items
 * SOLID: Single Responsibility - Connection list display
 */
export const ConnectionList: React.FC<ConnectionListProps> = ({
  data,
  isRefetching,
  onRefresh,
  tab,
  connectingUserId,
  onConnect,
  onViewProfile,
  onChat,
  connectedCount,
  searchQuery,
  onSearchChange,
  onTabChange,
}) => {
  const emptyMessage =
    tab === 'suggestions'
      ? 'No suggestions available'
      : "You don't have any connections yet";

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isRefetching}
      onRefresh={onRefresh}
      contentContainerStyle={styles.list}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <NetworkListHeader
          connectedCount={connectedCount}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          activeTab={tab}
          onTabChange={onTabChange}
        />
      }
      renderItem={({ item }) => (
        <ConnectionCard
          item={item}
          isSuggestion={tab === 'suggestions'}
          isConnecting={connectingUserId === item.id}
          onToggle={onConnect}
          onClickViewProfile={() => onViewProfile(item.id)}
          onClickChat={() => onChat(item.id)}
        />
      )}
      ListEmptyComponent={<EmptyState message={emptyMessage} />}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
});
