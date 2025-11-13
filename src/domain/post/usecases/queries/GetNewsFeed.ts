import { IPostRepository } from "../../repositories/IPostRepository";

export class GetNewsFeed {
  constructor(private repo: IPostRepository) {}

  async execute() {
    return this.repo.getAllPosts();
  }
}
