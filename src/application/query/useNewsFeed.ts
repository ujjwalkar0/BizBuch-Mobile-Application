import { useQuery } from "@tanstack/react-query";
import { postRepository } from '../../di';

export const useNewsFeed = () => {
  return useQuery({
    queryKey: ["newsFeed"],
    queryFn: () => postRepository.getAllPosts()
  });
};
