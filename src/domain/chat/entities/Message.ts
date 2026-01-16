export interface Message {
  id: number;
  conversation: number;
  sender: {
    id: number;
    display_name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  is_read: boolean;
  read_at?: string;
  type: "sent" | "received";
}

export interface SendMessagePayload {
  recipient_id: number;
  content: string;
}

export interface StartConversationPayload {
  user_id: number;
}

export interface MessagesResponse {
  results: Message[];
  count: number;
  has_more: boolean;
  next?: string;
  previous?: string;
}
