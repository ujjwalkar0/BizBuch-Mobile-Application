/**
 * Activity Entity (Notification)
 * Domain Layer: Core business entity for notifications
 * Based on API schema: GET /activity/notifications/
 */
export interface Activity {
  id: number;
  actor_username: string;
  actor_avatar_url?: string;
  verb: string;
  is_read: boolean;
  created_at: string;
}

/**
 * Notification tab filter types
 */
export type NotificationTabType = 'all' | 'unread' | 'mentions';
