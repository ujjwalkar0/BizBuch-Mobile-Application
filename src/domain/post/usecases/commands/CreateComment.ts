import { Comment, CreateCommentRequest } from "../../entities/Comment";
import { ICommentRepository } from "../../repositories/ICommentRepository";

/**
 * CreateComment UseCase
 * SOLID: Single Responsibility - Encapsulates comment creation logic
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class CreateComment {
  constructor(private readonly repository: ICommentRepository) {}

  async execute(postId: string, data: CreateCommentRequest): Promise<Comment> {
    return this.repository.createComment(postId, data);
  }
}
