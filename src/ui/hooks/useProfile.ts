import { useQuery } from '@tanstack/react-query';
import { getProfileByIdUseCase } from '../di';

export const useProfile = (userId: number) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfileByIdUseCase.execute(userId),
    enabled: !!userId,
  });
};
