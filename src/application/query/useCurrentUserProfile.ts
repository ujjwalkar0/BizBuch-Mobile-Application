import { useQuery } from "@tanstack/react-query";
import { profileRepository } from '../../di';

export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: () => profileRepository.getCurrentUserProfile(),
  });
};
