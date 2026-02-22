// data/chat/ChatRepository.ts
import { IChatRepository } from "../../domain/chat/repositories/IChatRepository";
import { Conversation } from "../../domain/chat/entities/Conversation";
import { Message, MessagesResponse, SendMessagePayload } from "../../domain/chat/entities/Message";
import { getAuth, postAuth } from "../../core/http";

export class ChatRepository implements IChatRepository {
  async getConversations(): Promise<Conversation[]> {
    const response = await getAuth<Conversation[]>("chat/conversations/");
    return response;
  }

  async getConversationById(conversationId: number): Promise<Conversation> {
    const response = await getAuth<Conversation>(`chat/conversations/${conversationId}/`);
    return response;
  }

  async startConversation(userId: number): Promise<Conversation> {
    const response = await postAuth<Conversation>("chat/conversations/start/", {
      user_id: userId,
    });
    return response;
  }

  async getMessages(conversationId: number, page: number = 1): Promise<MessagesResponse> {
    const response = await getAuth<MessagesResponse>(
      `chat/conversations/${conversationId}/messages/?page=${page}`
    );
    return response;
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    const response = await postAuth<Message>("chat/send/", payload);
    return response;
  }

  async markAsRead(conversationId: number, messageIds: number[]): Promise<void> {
    await postAuth(`chat/conversations/${conversationId}/read/`, {
      message_ids: messageIds,
    });
  }
}
