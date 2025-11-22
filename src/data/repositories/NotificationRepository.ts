// data/notification/repositories/NotificationRepository.ts

import { INotificationRepository } from "../../domain/notification/repositories/INotificationRepository";
import { Notification } from "../../domain/notification/entities/Notification";
import { mockNotifications } from "../datasources/MockNotificationDataSource";

export class NotificationRepository implements INotificationRepository {

    private notifications: Notification[] = [...mockNotifications];

    async getAll(): Promise<Notification[]> {
        return [...this.notifications];
    }

    async markAllAsRead(): Promise<void> {
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    }

}