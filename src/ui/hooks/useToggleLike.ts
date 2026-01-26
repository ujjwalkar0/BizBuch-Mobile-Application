import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostRepository } from '../../data/repositories/PostRepository';
import { ToggleLikePost } from '../../domain/post/usecases/commands/ToggleLikePost';

const postRepository = new PostRepository();
const toggleLikeUseCase = new ToggleLikePost(postRepository);

/**
 * useToggleLike Hook
 * SOLID: Single Responsibility - Handle like/unlike API calls with optimistic updates
 */
export const useToggleLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ postId, isLiked }: { postId: string; isLiked: boolean }) =>
      toggleLikeUseCase.execute(postId, isLiked),
    onError: (error) => {
      console.error('Error toggling like:', error);
    },
  });

  const toggleLike = (postId: string, isLiked: boolean) => {
    mutation.mutate({ postId, isLiked });
  };

  return {
    toggleLike,
    isLoading: mutation.isPending,
  };
};
