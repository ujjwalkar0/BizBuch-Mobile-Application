import { INotificationRepository } from '../repositories/INotificationRepository';

/**
 * MarkAllNotificationsAsRead UseCase
 * SOLID: Single Responsibility - Mark all notifications as read
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class MarkAllNotificationsAsRead {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(): Promise<void> {
    return this.repository.markAllAsRead();
  }
}
