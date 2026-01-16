import { Comment, CreateCommentRequest } from '../entities/Comment';

/**
 * ICommentRepository Interface
 * Domain Layer: Repository abstraction for comments
 * SOLID: Dependency Inversion - Data layer depends on this abstraction
 */
export interface ICommentRepository {
  /**
   * Get comments for a post
   * API: GET /posts/{post_id}/comments/
   */
  getComments(postId: string): Promise<Comment[]>;

  /**
   * Create a comment on a post
   * API: POST /posts/{post_id}/comments/
   */
  createComment(postId: string, data: CreateCommentRequest): Promise<Comment>;

  /**
   * Delete a comment
   * API: DELETE /posts/comments/{id}/
   */
  deleteComment(commentId: string): Promise<void>;
}
