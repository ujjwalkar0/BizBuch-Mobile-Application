// domain/notification/repositories/INotificationRepository.ts
import { Notification } from "../entities/Notification";

export interface INotificationRepository {
  getAll(): Promise<Notification[]>;
  markAllAsRead(): Promise<void>;
}
