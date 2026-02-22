import { useQuery } from '@tanstack/react-query';
import { commentRepository } from '../../di';

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentRepository.getComments(postId),
    enabled: !!postId,
  });
};