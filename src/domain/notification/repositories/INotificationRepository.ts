import { Activity } from '../entities/Activity';

/**
 * INotificationRepository Interface
 * Domain Layer: Repository abstraction for notifications
 * SOLID: Dependency Inversion - Data layer depends on this abstraction
 */
export interface INotificationRepository {
  /**
   * Get notifications for the current authenticated user
   * API: GET /activity/notifications/
   */
  getNotifications(): Promise<Activity[]>;

  /**
   * Mark a single notification as read
   * API: POST /activity/{id}/read/
   */
  markAsRead(id: number): Promise<void>;

  /**
   * Mark all notifications as read
   * API: POST /activity/read-all/
   */
  markAllAsRead(): Promise<void>;
}
