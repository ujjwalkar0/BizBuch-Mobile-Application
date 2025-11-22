// data/chat/datasources/mock/MockChatData.ts
import { Chat } from "../../domain/chat/entities/Chat";

export const MockChatData: Chat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    lastMessage: "That sounds great! Let's schedule a call.",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    lastMessage: "Thanks for sharing the resources!",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    lastMessage: "See you at the conference!",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: false,
  },
];
