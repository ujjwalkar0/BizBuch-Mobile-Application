import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewsFeedHeader } from '../components/molecules/NewsFeedHeader';
import { CenteredLoader } from '../components/molecules/CenteredLoader';
import { CenteredError } from '../components/molecules/CenteredError';
import { PostList } from '../components/organisms/PostList';
import { NewsFeedListHeader } from '../components/molecules/NewsFeedListHeader';
import { theme } from '../theme';
import { PostResponseBody } from '../../domain/post/entities/Post';

interface NewsFeedScreenTemplateProps {
  navigation: any;
  posts: PostResponseBody[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onPostPress: (postId: string) => void;
}

/**
 * NewsFeedScreenTemplate
 * Atomic Design: Template - Page layout structure for news feed
 * SOLID Principles:
 * - Single Responsibility: Define visual structure only
 * - Open/Closed: Extended without modification
 * - Dependency Inversion: Depends on abstractions (organisms, molecules)
 */
export const NewsFeedScreenTemplate: React.FC<NewsFeedScreenTemplateProps> = ({
  navigation,
  posts,
  isLoading,
  isError,
  isRefreshing,
  onRefresh,
  onPostPress,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <NewsFeedHeader navigation={navigation} />
        <CenteredLoader />
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <NewsFeedHeader navigation={navigation} />
        <CenteredError message="Failed to load posts" />
      </SafeAreaView>
    );
  }

  // Success state
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PostList
        posts={posts}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onPostPress={onPostPress}
        ListHeaderComponent={<NewsFeedListHeader navigation={navigation} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
});
