import { Connection } from "../../user/entities/Connection";

export interface Chat {
  id: number;
  name: string;
  user: Connection;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}
