import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectionRepository } from "../di";
import { SendConnectionRequest, RemoveConnection } from "../../domain/user/usecases/ToggleConnectionStatus";

const sendConnectionRequestUseCase = new SendConnectionRequest(connectionRepository);
const removeConnectionUseCase = new RemoveConnection(connectionRepository);

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => sendConnectionRequestUseCase.execute(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["myConnections"] });
    },
  });
};

export const useRemoveConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => removeConnectionUseCase.execute(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["myConnections"] });
    },
  });
};
