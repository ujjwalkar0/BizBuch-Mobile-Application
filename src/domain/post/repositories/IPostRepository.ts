import { Post } from "../entities/Post";

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | null>;
  createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post>;
}
