import { useQuery } from '@tanstack/react-query';
import { profileRepository } from '../../di';

export const useProfile = (userId: number) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileRepository.getProfileById(userId),
    enabled: !!userId,
  });
};
