import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHeart as faHeartSolid,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComment,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { PostResponseBody } from '../../domain/post/entities/Post';
import { theme } from '../theme';

interface Props {
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

export const PostCard: React.FC<Props> = ({
  post,
  onPostOpen,
  onLike,
  onComment,
  onShare,
  onSend,
  onFollow,
  onMenuPress,
  isFollowing = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <View style={styles.card}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.authorSection}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: post.author }} style={styles.avatar} />
          </View>
          <Text style={styles.username} numberOfLines={1}>
            {post.author}
          </Text>
        </View>

        <View style={styles.headerActions}>
          {/* Follow Button */}
          <TouchableOpacity
            style={[styles.followBtn, isFollowing && styles.following]}
            onPress={onFollow}
            activeOpacity={0.8}
          >
            <Text style={[styles.followText, isFollowing && styles.followingText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>

          {/* Menu Button */}
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
            <FontAwesomeIcon icon={faEllipsisVertical} size={16} color={theme.colors.gray700} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Content */}
      {post.content && (
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{post.content}</Text>
        </View>
      )}

      {/* Post Image */}
      {post.image_url && (
        <TouchableOpacity onPress={onPostOpen} activeOpacity={0.95}>
          <Image source={{ uri: post.image_url }} style={styles.image} />
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={isLiked ? faHeartSolid : faHeart}
              size={24}
              color={isLiked ? theme.colors.primary : theme.colors.gray700}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onComment} activeOpacity={0.7}>
            <FontAwesomeIcon icon={faComment} size={24} color={theme.colors.gray700} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onSend} activeOpacity={0.7}>
            <FontAwesomeIcon icon={faPaperPlane} size={22} color={theme.colors.gray700} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Likes and Comments Count */}
      <View style={styles.statsContainer}>
        <Text style={styles.likeCount}>{likeCount.toLocaleString()} likes</Text>
        {(post.comments_count ?? 0) > 0 && (
          <TouchableOpacity onPress={onComment}>
            <Text style={styles.commentsLink}>
              View all {post.comments_count} comments
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarRing: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: `${theme.colors.primary}50`,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray200,
  },
  username: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray900,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  followBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  followText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  following: {
    backgroundColor: theme.colors.gray200,
  },
  followingText: {
    color: theme.colors.gray700,
  },
  menuButton: {
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  content: {
    fontSize: 14,
    color: theme.colors.gray900,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.colors.gray100,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  statsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray900,
  },
  commentsLink: {
    fontSize: 14,
    color: theme.colors.gray500,
    marginTop: 4,
  },
});
