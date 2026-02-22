import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentRepository } from '../../di';
import { CreateCommentRequest } from '../../domain/post/entities/Comment';

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => commentRepository.createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['newsFeed'] });
    },
  });
};
