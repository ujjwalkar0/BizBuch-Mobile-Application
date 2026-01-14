import { INotificationRepository } from '../repositories/INotificationRepository';

/**
 * MarkNotificationAsRead UseCase
 * SOLID: Single Responsibility - Mark single notification as read
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class MarkNotificationAsRead {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(id: number): Promise<void> {
    return this.repository.markAsRead(id);
  }
}
