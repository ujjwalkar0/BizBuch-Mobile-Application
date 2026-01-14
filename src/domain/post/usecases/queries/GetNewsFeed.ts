import { PostResponseBody } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepository";

export class GetNewsFeed {
  constructor(private readonly postRepository: IPostRepository) {}

  execute(): Promise<PostResponseBody[]> {
    return this.postRepository.getAllPosts();
  }
}
