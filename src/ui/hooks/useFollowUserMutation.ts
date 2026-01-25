import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileRepository } from '../../data/repositories/ProfileRepository';

const profileRepository = new ProfileRepository();

/**
 * useFollowUserMutation Hook
 * SOLID: Single Responsibility - Handle follow user mutation
 * SOLID: Dependency Inversion - Depends on ProfileRepository abstraction
 */
export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => profileRepository.followUser(userId),
    onSuccess: (_data, userId) => {
      // Invalidate the viewed profile to refresh follow status
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      // Also invalidate current user profile as followers count may change
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: (error) => {
      console.error('Follow user error:', error);
    },
  });
};
