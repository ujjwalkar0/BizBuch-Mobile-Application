import React, { useCallback, useState } from 'react';
import { NewsFeedScreenProps } from '../navigation/news-feed-navigation/NewsFeedScreenStackParamList';
import { NewsFeedScreenTemplate } from '../components/templates/NewsFeedScreenTemplate';
import { useNewsFeedScreen } from '../../ui/hooks/useNewsFeedScreen';
import { CommentBottomSheet } from '../components/organisms/CommentBottomSheet';

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

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCommentSheetVisible, setIsCommentSheetVisible] = useState(false);

  const handleOpenComments = useCallback((postId: string) => {
    setSelectedPostId(postId);
    setIsCommentSheetVisible(true);
  }, []);

  const handleCloseComments = useCallback(() => {
    setIsCommentSheetVisible(false);
    // Delay clearing postId to allow modal animation to complete
    setTimeout(() => setSelectedPostId(null), 300);
  }, []);

  return (
    <>
      <NewsFeedScreenTemplate
        navigation={navigation}
        posts={posts}
        isLoading={isLoading}
        isError={isError}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onCommentPress={handleOpenComments}
      />
      {selectedPostId !== null && (
        <CommentBottomSheet
          visible={isCommentSheetVisible}
          postId={selectedPostId}
          onClose={handleCloseComments}
        />
      )}
    </>
  );
};

export default NewsFeedScreen;
