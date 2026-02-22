import { useMutation } from '@tanstack/react-query';
import { postRepository } from '../../di';


export const useToggleLike = () => {

  const mutation = useMutation({
    mutationFn: ({ postId, isLiked }: { postId: string; isLiked: boolean }) =>
      isLiked ? postRepository.likePost(postId) : postRepository.unlikePost(postId),
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
