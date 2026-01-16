import { Poll, PostRequestBody } from '../../../domain/post/entities/Post';
import { IPostRepository } from '../../../domain/post/repositories/IPostRepository';

export class CreatePostHandler {
  constructor(private readonly postRepository: IPostRepository) {}

  async handle(post: PostRequestBody): Promise<boolean> {
    await this.postRepository.create(post);
    return true;
  }
}
