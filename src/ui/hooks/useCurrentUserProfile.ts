import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfileUseCase } from "../di";

export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: () => getCurrentUserProfileUseCase.execute(),
  });
};
