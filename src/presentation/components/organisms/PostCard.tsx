import React, { useState, useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { PostHeader } from '../molecules/PostHeader';
import { PostContentText } from '../atoms/PostContentText';
import { PostImage } from '../atoms/PostImage';
import { PostActionsRow } from '../molecules/PostActionsRow';
import { PostStats } from '../molecules/PostStats';
import { PostResponseBody } from '../../../domain/post/entities/Post';
import { theme } from '../../theme';

const { postCard } = theme.components;

interface PostCardProps {
  post: PostResponseBody;
  onPostOpen?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSend?: () => void;
  onFollow?: () => void;
  onMenuPress?: () => void;
  isFollowing?: boolean;
}

/**
 * PostCard Organism
 * Atomic Design: Organism - Composed of PostHeader, PostContent, PostImage, PostActionsRow, PostStats
 * SOLID Principles:
 * - Single Responsibility: Orchestrate post display
 * - Open/Closed: Extended through molecule composition
 * - Dependency Inversion: Uses abstractions (molecules, atoms)
 */
export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostOpen,
  onLike,
  onComment,
  onSend,
  onFollow,
  onMenuPress,
  isFollowing = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = useCallback(() => {
    setIsLiked(prev => {
      setLikeCount((count: number) => prev ? count - 1 : count + 1);
      return !prev;
    });
    onLike?.();
  }, [onLike]);

  const handleComment = useCallback(() => {
    onComment?.();
  }, [onComment]);

  const commentsCount = post.comments ?? 0;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderBottomWidth: postCard.borderBottomWidth,
      borderColor: theme.colors.border,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <PostHeader
        authorName={post.author}
        authorAvatar={post.author}
        isFollowing={isFollowing}
        onFollow={onFollow}
        onMenuPress={onMenuPress}
      />

      {post.content && <PostContentText content={post.content} />}

      {post.image_url && (
        <PostImage uri={post.image_url} onPress={onPostOpen} />
      )}

      <PostActionsRow
        isLiked={isLiked}
        commentsCount={commentsCount}
        onLike={handleLike}
        onComment={handleComment}
        onSend={onSend}
      />

      <PostStats
        likesCount={likeCount}
        commentsCount={commentsCount}
        onCommentsPress={handleComment}
      />
    </View>
  );
};
