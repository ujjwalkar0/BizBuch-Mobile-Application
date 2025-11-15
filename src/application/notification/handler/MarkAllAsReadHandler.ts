// application/notification/handlers/MarkAllAsReadHandler.ts
import { INotificationRepository } from "../../../domain/notification/repositories/INotificationRepository";

export class MarkAllAsReadHandler {
  constructor(private repo: INotificationRepository) {}

  async handle(): Promise<void> {
    await this.repo.markAllAsRead();
  }
}
