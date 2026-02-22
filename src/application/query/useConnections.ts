import { useQuery } from "@tanstack/react-query";
import { connectionRepository } from '../../di';

export const useMyConnections = () => {
  return useQuery({
    queryKey: ["myConnections"],
    queryFn: () => connectionRepository.getMyConnections(),
  });
};
