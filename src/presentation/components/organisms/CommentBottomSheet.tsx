import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { CommentSheetHeader } from '../molecules/CommentSheetHeader';
import { CommentList } from './CommentList';
import { CommentInput } from '../molecules/CommentInput';
import { useComments, useCreateComment } from '../../../ui/hooks/useComments';
import { theme } from '../../theme';

interface CommentBottomSheetProps {
  visible: boolean;
  postId: string;
  onClose: () => void;
}

/**
 * CommentBottomSheet Organism
 * Atomic Design: Organism - Complete comment section with header, list, and input
 * SOLID Principles:
 * - Single Responsibility: Comment sheet UI orchestration
 * - Open/Closed: Extended through molecule composition
 * - Dependency Inversion: Uses hooks for data access
 */
export const CommentBottomSheet: React.FC<CommentBottomSheetProps> = ({
  visible,
  postId,
  onClose,
}) => {
  const { data: comments, isLoading } = useComments(postId);
  const createCommentMutation = useCreateComment(postId);

  const handleSubmitComment = useCallback(
    (content: string) => {
      createCommentMutation.mutate({ content });
    },
    [createCommentMutation],
  );

  const commentsData = comments ?? [];

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.sheet}>
          <CommentSheetHeader
            commentsCount={commentsData.length}
            onClose={onClose}
          />

          <View style={styles.content}>
            <CommentList comments={commentsData} isLoading={isLoading} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <CommentInput
              onSubmit={handleSubmitComment}
              isSubmitting={createCommentMutation.isPending}
            />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  sheet: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
  },
});
    