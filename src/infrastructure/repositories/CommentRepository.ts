import { Comment, CreateCommentRequest } from '../../domain/post/entities/Comment';
import { ICommentRepository } from '../../domain/post/repositories/ICommentRepository';
import { getAuth, postAuth, deleteAuth } from '../../core/http';

/**
 * CommentRepository Implementation
 * Data Layer: Implements repository interface
 * SOLID: Single Responsibility - Data access for comments
 * SOLID: Dependency Inversion - Implements domain interface
 */
export class CommentRepository implements ICommentRepository {
  async getComments(postId: string): Promise<Comment[]> {
    return getAuth<Comment[]>(`posts/${postId}/comments/`);
  }

  async createComment(postId: string, data: CreateCommentRequest): Promise<Comment> {
    return postAuth<Comment>(`posts/${postId}/comments/`, data);
  }

  async deleteComment(commentId: string): Promise<void> {
    await deleteAuth(`posts/comments/${commentId}/`);
  }
}
