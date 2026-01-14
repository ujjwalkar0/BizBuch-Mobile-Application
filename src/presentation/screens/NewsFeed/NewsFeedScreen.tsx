import React, { useCallback } from 'react';
import { NewsFeedScreenProps } from '../../navigation/news-feed-navigation/NewsFeedScreenStackParamList';
import { NewsFeedScreenTemplate } from '../../templates/NewsFeedScreenTemplate';
import { useNewsFeedScreen } from '../../../ui/hooks/useNewsFeedScreen';

/**
 * NewsFeedScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hooks and template
 * - Dependency Inversion: Depends on abstractions (hook, template)
 */
const NewsFeedScreen: React.FC<NewsFeedScreenProps> = ({ navigation }) => {
  const {
    posts,
    isLoading,
    isError,
    isRefreshing,
    handleRefresh,
  } = useNewsFeedScreen();

  const handlePostPress = useCallback(
    (postId: string) => {
      // navigation.navigate("ViewPost", { postId });
      console.log('Open post:', postId);
    },
    [navigation],
  );

  return (
    <NewsFeedScreenTemplate
      navigation={navigation}
      posts={posts}
      isLoading={isLoading}
      isError={isError}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onPostPress={handlePostPress}
    />
  );
};

export default NewsFeedScreen;
