import React, { useCallback, useState } from 'react';
import { NewsFeedScreenProps } from '../navigation/news-feed-navigation/NewsFeedScreenStackParamList';
import { NewsFeedScreenTemplate } from '../components/templates/NewsFeedScreenTemplate';
import { CommentBottomSheet } from '../components/organisms/CommentBottomSheet';
import { useNewsFeedScreen } from './hooks/useNewsFeedScreen';

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
