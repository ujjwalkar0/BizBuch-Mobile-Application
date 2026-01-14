import { useCallback } from 'react';
import { useNewsFeed } from './useNewsFeed';

/**
 * useNewsFeedScreen Hook
 * Single Responsibility: Encapsulate news feed screen logic
 * Facade Pattern: Unified interface for screen state and actions
 */
export const useNewsFeedScreen = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useNewsFeed();

  const handlePostPress = useCallback((postId: string) => {
    // Navigation logic can be injected or handled by the screen
    console.log('Open post:', postId);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Data
    posts: data ?? [],

    // Loading states
    isLoading,
    isError,
    isRefreshing: isRefetching,

    // Actions
    handlePostPress,
    handleRefresh,
  };
};
