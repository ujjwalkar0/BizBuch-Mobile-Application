import { useCallback } from 'react';
import { FeedNavigationProp } from '../../presentation/navigation/news-feed-navigation/NewsFeedScreenStackParamList';

interface UseNewsFeedHeaderProps {
  navigation: FeedNavigationProp;
}

interface UseNewsFeedHeaderReturn {
  handleProfilePress: () => void;
}

/**
 * useNewsFeedHeader Hook
 * SOLID: Single Responsibility - Handles header navigation logic
 * SOLID: Dependency Inversion - Depends on navigation abstraction
 */
export const useNewsFeedHeader = ({
  navigation,
}: UseNewsFeedHeaderProps): UseNewsFeedHeaderReturn => {
  const handleProfilePress = useCallback(() => {
    navigation.navigate('ViewProfile', {});
  }, [navigation]);

  return {
    handleProfilePress,
  };
};
