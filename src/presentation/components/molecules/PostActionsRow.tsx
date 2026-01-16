import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComment,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { PostActionIcon } from '../atoms/PostActionIcon';
import { theme } from '../../theme';

const { postActions, postActionIcon } = theme.components;

interface PostActionsRowProps {
  isLiked: boolean;
  commentsCount: number;
  onLike?: () => void;
  onComment?: () => void;
  onSend?: () => void;
}

/**
 * PostActionsRow Molecule
 * Atomic Design: Molecule - Composed of PostActionIcon atoms
 * Single Responsibility: Display post action buttons
 * SOLID: Open/Closed - Styles from theme
 */
export const PostActionsRow: React.FC<PostActionsRowProps> = ({
  isLiked,
  commentsCount,
  onLike,
  onComment,
  onSend,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: postActions.paddingHorizontal,
      paddingVertical: postActions.paddingVertical,
    }),
    [],
  );

  const leftActionsStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: postActions.gap,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={leftActionsStyle}>
        <PostActionIcon
          icon={isLiked ? faHeartSolid : faHeart}
          isActive={isLiked}
          activeColor={theme.colors.primary}
          onPress={onLike}
        />
        <PostActionIcon
          icon={faComment}
          count={commentsCount}
          onPress={onComment}
        />
        <PostActionIcon
          icon={faPaperPlane}
          size={postActionIcon.sendIconSize}
          onPress={onSend}
        />
      </View>
    </View>
  );
};
