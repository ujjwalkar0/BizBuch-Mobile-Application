// application/notification/handlers/GetNotificationsHandler.ts

import { Notification } from "../../../domain/notification/entities/Notification";
import { INotificationRepository } from "../../../domain/notification/repositories/INotificationRepository";

export class GetNotificationsHandler {
  constructor(private repo: INotificationRepository) {}

  async handle(): Promise<Notification[]> {
    return this.repo.getAll();
  }
}
