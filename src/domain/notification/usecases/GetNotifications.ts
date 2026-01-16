import { Activity } from '../entities/Activity';
import { INotificationRepository } from '../repositories/INotificationRepository';

/**
 * GetNotifications UseCase
 * SOLID: Single Responsibility - Encapsulates notification fetching logic
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class GetNotifications {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(): Promise<Activity[]> {
    return this.repository.getNotifications();
  }
}
