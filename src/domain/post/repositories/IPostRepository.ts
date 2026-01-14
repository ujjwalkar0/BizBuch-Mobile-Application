import { PostRequestBody, PostResponseBody } from '../entities/Post';

export interface IPostRepository {
  getAllPosts(): Promise<PostResponseBody[]>;
  getPostById(id: string): Promise<PostResponseBody | null>;
  create(postBody: PostRequestBody): Promise<void>;
}
