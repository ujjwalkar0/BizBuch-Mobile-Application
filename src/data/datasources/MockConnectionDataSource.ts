import { Connection } from "../../domain/user/entities/Connection";

export const mockConnections: Connection[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    title: "Product Designer at Google",
    mutualConnections: 12,
    isConnected: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "@mchen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    title: "Software Engineer at Meta",
    mutualConnections: 8,
    isConnected: false,
  },
];