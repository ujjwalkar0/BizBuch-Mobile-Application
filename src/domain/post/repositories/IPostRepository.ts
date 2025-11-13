import { Post } from "../entities/Post";

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post>;
}
