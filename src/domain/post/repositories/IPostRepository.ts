import { PostRequestBody } from '../entities/Post';

export interface IPostRepository {
  getAllPosts(): Promise<PostRequestBody[]>;
  getPostById(id: string): Promise<PostRequestBody | null>;
  // createPost(post: Omit<PostRequestBody, "id" | "createdAt">): Promise<PostRequestBody>;
  create(postBody: PostRequestBody): Promise<void>;
}
