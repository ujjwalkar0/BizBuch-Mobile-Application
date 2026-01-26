import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PostResponseBody } from '../../../domain/post/entities/Post';
import { theme } from '../../theme';
import { PostCard } from './PostCard';
import { useToggleLike } from '../../../ui/hooks/useToggleLike';

interface PostListProps {
  posts: PostResponseBody[];
  isRefreshing: boolean;
  onRefresh: () => void;
  onCommentPress: (postId: string) => void;
  ListHeaderComponent?: React.ReactElement;
}

/**
 * PostList Organism
 * Atomic Design: Organism - Complex list of posts
 * SOLID Principles:
 * - Single Responsibility: Render scrollable post list
 * - Open/Closed: Extended via ListHeaderComponent
 * - Interface Segregation: Focused props interface
 */
export const PostList: React.FC<PostListProps> = ({
  posts,
  isRefreshing,
  onRefresh,
  onCommentPress,
  ListHeaderComponent,
}) => {
  const { toggleLike } = useToggleLike();
  const keyExtractor = (item: PostResponseBody) => item.id;

  const renderItem = ({ item }: { item: PostResponseBody }) => (
    <PostCard
      post={item}
      onComment={() => onCommentPress(item.id)}
      onLike={(isLiked: boolean) => toggleLike(item.id, isLiked)}
    />
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
});
