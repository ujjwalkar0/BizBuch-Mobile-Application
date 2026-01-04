import { IPostRepository } from '../../domain/post/repositories/IPostRepository';
import { PostRequestBody } from '../../domain/post/entities/Post';
import { postAuth } from '../../core/http';

export class PostRepository implements IPostRepository {
  getAllPosts(): Promise<PostRequestBody[]> {
    throw new Error('Method not implemented.');
  }
  getPostById(id: string): Promise<PostRequestBody | null> {
    throw new Error('Method not implemented.');
  }
  // createPost(post: Omit<PostRequestBody, 'id' | 'createdAt'>): Promise<PostRequestBody> {
  //   throw new Error('Method not implemented.');
  // }
  async create(postBody: PostRequestBody): Promise<void> {
    await postAuth('/posts/', postBody);
  }
}
