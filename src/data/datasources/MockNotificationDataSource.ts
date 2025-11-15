import { Notification } from "../../domain/notification/entities/Notification";

export const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "mention",
      message: "Alex mentioned you in a comment.",
      time: "2h ago",
      read: false,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      type: "message",
      message: "Maria sent you a new message.",
      time: "5h ago",
      read: false,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "3",
      type: "follow",
      message: "David started following you.",
      time: "1d ago",
      read: true,
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];