import { Comment } from "../../entities/Comment";
import { ICommentRepository } from "../../repositories/ICommentRepository";

/**
 * GetComments UseCase
 * SOLID: Single Responsibility - Encapsulates comment fetching logic
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class GetComments {
  constructor(private readonly repository: ICommentRepository) {}

  async execute(postId: string): Promise<Comment[]> {
    return this.repository.getComments(postId);
  }
}
