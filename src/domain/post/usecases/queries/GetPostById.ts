import { IPostRepository } from "../../repositories/IPostRepository";
import { Post } from "../../entities/Post";

export class GetPostById {
  constructor(private repo: IPostRepository) {}

  async execute(id: string): Promise<Post | null> {
    return this.repo.getPostById(id);
  }
}
