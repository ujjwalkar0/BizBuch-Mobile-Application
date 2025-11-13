import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepository";

export class CreatePost {
  constructor(private repo: IPostRepository) {}

  async execute(postData: Omit<Post, "id" | "createdAt">): Promise<Post> {
    if (!postData.content.trim() && !postData.image) {
      throw new Error("Post must have content or image");
    }
    return this.repo.createPost(postData);
  }
}
