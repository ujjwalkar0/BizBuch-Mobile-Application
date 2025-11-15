// domain/notification/entities/Notification.ts
export interface Notification {
  id: string;
  type: "mention" | "message" | "follow" | "update";
  message: string;
  time: string;
  read: boolean;
  avatar: string;
}
