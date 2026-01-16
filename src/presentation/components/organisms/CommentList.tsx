import React, { useMemo } from 'react';
import { FlatList, ViewStyle, View, ActivityIndicator } from 'react-native';
import { CommentItem } from '../molecules/CommentItem';
import { Comment } from '../../../domain/post/entities/Comment';
import { EmptyState } from '../molecules/EmptyState';
import { theme } from '../../theme';

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
}

/**
 * CommentList Organism
 * Atomic Design: Organism - Composes CommentItem molecules
 * Single Responsibility: Manage comment list rendering
 * SOLID: Open/Closed - Styles from theme
 */
export const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading,
}) => {
  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      flexGrow: 1,
      paddingBottom: 8,
    }),
    [],
  );

  const loaderStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    }),
    [],
  );

  const renderItem = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} />
  );

  const keyExtractor = (item: Comment) => item.id.toString();

  if (isLoading) {
    return (
      <View style={loaderStyle}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (comments.length === 0) {
    return (
      <EmptyState
        message="No comments yet"
        subMessage="Be the first to comment!"
      />
    );
  }

  return (
    <FlatList
      data={comments}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};
