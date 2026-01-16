import { IPostRepository } from '../../domain/post/repositories/IPostRepository';
import { PostRequestBody, PostResponseBody } from '../../domain/post/entities/Post';
import { postAuth, getAuth } from '../../core/http';

export class PostRepository implements IPostRepository {
  async getAllPosts(): Promise<PostResponseBody[]> {
    return await getAuth('posts');
  }
  async getPostById(id: string): Promise<PostResponseBody | null> {
    return await getAuth(`posts/${id}`);
  }
  async create(postBody: PostRequestBody): Promise<void> {
    await postAuth('posts/', postBody);
  }
}
