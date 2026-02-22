import { Activity } from '../../domain/notification/entities/Activity';
import { INotificationRepository } from '../../domain/notification/repositories/INotificationRepository';
import { getAuth, postAuth } from '../../core/http';

/**
 * NotificationRepository Implementation
 * Data Layer: Implements repository interface
 * SOLID: Single Responsibility - Data access for notifications
 * SOLID: Dependency Inversion - Implements domain interface
 */
export class NotificationRepository implements INotificationRepository {
  async getNotifications(): Promise<Activity[]> {
    return getAuth<Activity[]>('activity/notifications/');
  }

  async markAsRead(id: number): Promise<void> {
    await postAuth(`activity/${id}/read/`, {});
  }

  async markAllAsRead(): Promise<void> {
    await postAuth('activity/read-all/', {});
  }
}
