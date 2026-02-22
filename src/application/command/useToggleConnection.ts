import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectionRepository } from "../../di";

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => connectionRepository.sendConnectionRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["myConnections"] });
    },
  });
};

export const useRemoveConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => connectionRepository.removeConnection(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["myConnections"] });
    },
  });
};
