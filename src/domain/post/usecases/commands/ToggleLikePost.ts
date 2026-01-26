import { IPostRepository } from '../../repositories/IPostRepository';

/**
 * ToggleLikePost Use Case
 * SOLID: Single Responsibility - Handle like/unlike logic
 */
export class ToggleLikePost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postId: string, isCurrentlyLiked: boolean): Promise<void> {
    if (isCurrentlyLiked) {
      await this.postRepository.unlikePost(postId);
    } else {
      await this.postRepository.likePost(postId);
    }
  }
}
