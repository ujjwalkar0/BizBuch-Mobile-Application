import { useQuery } from "@tanstack/react-query";
import { getNewsFeedUseCase } from "../di";

export const useNewsFeed = () => {
  return useQuery({
    queryKey: ["newsFeed"],
    queryFn: () => getNewsFeedUseCase.execute(),
  });
};
