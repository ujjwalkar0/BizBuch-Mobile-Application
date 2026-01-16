export interface Participant {
  id: number;
  display_name: string;
  avatar: string;
  headline?: string;
  first_name?: string;
  last_name?: string;
}

export interface Conversation {
  id: number;
  other_participant: Participant;
  created_at: string;
  updated_at: string;
  last_message?: {
    id: number;
    content: string;
    sender_id: number;
    timestamp: string;
    is_read: boolean;
  };
  unread_count: number;
}
