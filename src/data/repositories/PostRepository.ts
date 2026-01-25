import { IPostRepository } from '../../domain/post/repositories/IPostRepository';
import { PostRequestBody, PostResponseBody } from '../../domain/post/entities/Post';
import { postAuth, getAuth } from '../../core/http';

export class PostRepository implements IPostRepository {
  async getAllPosts(): Promise<PostResponseBody[]> {
    const allPosts = await getAuth<PostResponseBody[]>('posts');
    return allPosts;
  }
  async getPostById(id: string): Promise<PostResponseBody | null> {
    return await getAuth<PostResponseBody | null>(`posts/${id}`);
  }
  async create(postBody: PostRequestBody): Promise<void> {
    return await postAuth('posts/', postBody);
  }
}
