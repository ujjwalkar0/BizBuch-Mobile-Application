/**
 * Comment Entity
 * Domain Layer: Core business entity for post comments
 * Based on API schema: GET /posts/{post_id}/comments/
 */
export interface Comment {
  id: number;
  post: number;
  user: string;
  content: string;
  created_at: string;
}

/**
 * CreateCommentRequest
 * Domain Layer: Request payload for creating a comment
 * Based on API schema: POST /posts/{post_id}/comments/
 */
export interface CreateCommentRequest {
  content: string;
}
