import { useCallback } from 'react';
import { FeedNavigationProp } from '../presentation/navigation/news-feed-navigation/NewsFeedScreenStackParamList';

interface UseNewsFeedHeaderProps {
  navigation: FeedNavigationProp;
}

interface UseNewsFeedHeaderReturn {
  handleProfilePress: () => void;
}

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
