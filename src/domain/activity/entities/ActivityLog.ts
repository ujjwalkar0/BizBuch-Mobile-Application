/**
 * ActivityLog Entity
 * Domain Layer: Core business entity
 * Based on API schema: GET /activity/log/
 */
export interface ActivityLog {
  id: number;
  verb: string;
  target_type: string | null;
  target_id: number | null;
  created_at: string;
}

/**
 * Activity verb types for display purposes
 */
export type ActivityVerb = 
  | 'post_created'
  | 'post_liked'
  | 'post_commented'
  | 'connection_sent'
  | 'connection_accepted'
  | 'profile_updated'
  | 'followed'
  | string;
