export interface Connection {
  id: number;
  display_name: string;
  username: string;
  avatar: string;
  headline: string;
  current_position: string;
  company: string;
  mutual_connections_count: string;
  is_connected: string;
  is_verified: boolean;
  followers_count: string;
}