import { useQuery } from "@tanstack/react-query";
import { connectionRepository } from "../di";
import { GetProfiles, GetMyConnections } from "../../domain/user/usecases/GetConnections";

const getProfilesUseCase = new GetProfiles(connectionRepository);
const getMyConnectionsUseCase = new GetMyConnections(connectionRepository);

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfilesUseCase.execute(),
  });
};

export const useMyConnections = () => {
  return useQuery({
    queryKey: ["myConnections"],
    queryFn: () => getMyConnectionsUseCase.execute(),
  });
};
