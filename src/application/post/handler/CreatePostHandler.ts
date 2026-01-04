import { Poll, PostRequestBody } from '../../../domain/post/entities/Post';
import { IPostRepository } from '../../../domain/post/repositories/IPostRepository';

export class CreatePostHandler {
  constructor(private readonly postRepository: IPostRepository) {}

  async handle(post: PostRequestBody): Promise<boolean> {
    // this.validatePost(post);
    // post.poll && this.validatePoll(post.poll);
    await this.postRepository.create(post);
    return true;
  }

  // private validatePost(post: PostRequestBody) {
  //   if (
  //     !post.content?.trim() &&
  //     !post.imageUrl &&
  //     !post.poll &&
  //     !post.location &&
  //     !post.feeling
  //   ) {
  //     throw new Error('Post must have content, image, or poll');
  //   }
  // }

  // private validatePoll(poll: Poll) {
  //   if (!poll.question.trim()) {
  //     throw new Error('Poll question is required');
  //   }

  //   const validOptions = poll.options.filter(o => o.trim());

  //   if (validOptions.length < 2) {
  //     throw new Error('Poll must have at least 2 options');
  //   }

  //   if (validOptions.length > 5) {
  //     throw new Error('Poll can have at most 5 options');
  //   }
  // }
}
