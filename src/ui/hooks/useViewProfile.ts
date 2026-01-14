import { useQuery } from '@tanstack/react-query';
import { getProfileByIdUseCase, getCurrentUserProfileUseCase } from '../di';

/**
 * useViewProfile Hook
 * SOLID: Single Responsibility - Unified profile fetching for ViewProfile screen
 * SOLID: Open/Closed - Handles both current user (profiles/me) and other users (profiles/{id})
 * 
 * @param userId - Optional user ID. If not provided, fetches current user's profile
 */
export const useViewProfile = (userId?: number) => {
  const isCurrentUser = userId === undefined || userId === null;

  return useQuery({
    queryKey: isCurrentUser ? ['currentUserProfile'] : ['profile', userId],
    queryFn: () =>
      isCurrentUser
        ? getCurrentUserProfileUseCase.execute()
        : getProfileByIdUseCase.execute(userId!),
  });
};
