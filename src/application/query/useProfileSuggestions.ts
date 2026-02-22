import { useQuery } from "@tanstack/react-query";
import { connectionRepository } from '../../di';

export const useProfileSuggestions = () => {
  return useQuery({
    queryKey: ["profileSuggestions"],
    queryFn: () => connectionRepository.getProfileSuggestions(),
  });
};
  