import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommentsUseCase, createCommentUseCase } from '../di';
import { CreateCommentRequest } from '../../domain/post/entities/Comment';

/**
 * useComments Hook
 * UI Layer: React Query hook for fetching comments
 * SOLID: Single Responsibility - Manages comments query state
 */
export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsUseCase.execute(postId),
    enabled: !!postId,
  });
};

/**
 * useCreateComment Hook
 * UI Layer: Mutation hook for creating a comment
 */
export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createCommentUseCase.execute(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['newsFeed'] });
    },
  });
};
