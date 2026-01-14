// domain/chat/repositories/IChatRepository.ts
import { Conversation } from "../entities/Conversation";
import { Message, MessagesResponse, SendMessagePayload } from "../entities/Message";

export interface IChatRepository {
  getConversations(): Promise<Conversation[]>;
  getConversationById(conversationId: number): Promise<Conversation>;
  startConversation(userId: number): Promise<Conversation>;
  getMessages(conversationId: number, page?: number): Promise<MessagesResponse>;
  sendMessage(payload: SendMessagePayload): Promise<Message>;
  markAsRead(conversationId: number, messageIds: number[]): Promise<void>;
}
