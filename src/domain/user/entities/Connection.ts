export interface Connection {
  id: number;
  name: string;
  username: string;
  avatar: string;
  title: string;
  mutualConnections?: number;
  isConnected: boolean;
}
