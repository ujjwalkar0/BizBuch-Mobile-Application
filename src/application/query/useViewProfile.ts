import { useQuery } from '@tanstack/react-query';
import { profileRepository } from '../../di';


export const useViewProfile = (userId?: number) => {
  const isCurrentUser = userId === undefined || userId === null;

  return useQuery({
    queryKey: isCurrentUser ? ['currentUserProfile'] : ['profile', userId],
    queryFn: () =>
      isCurrentUser
        ? profileRepository.getCurrentUserProfile()
        : profileRepository.getProfileById(userId!),
  });
};
