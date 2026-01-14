// data/chat/ChatRepository.ts
import { IChatRepository } from "../../domain/chat/repositories/IChatRepository";
import { Conversation } from "../../domain/chat/entities/Conversation";
import { Message, MessagesResponse, SendMessagePayload } from "../../domain/chat/entities/Message";
import { getChatAuth, postChatAuth } from "../../core/http";

export class ChatRepository implements IChatRepository {
  async getConversations(): Promise<Conversation[]> {
    const response = await getChatAuth<Conversation[]>("chat/conversations/");
    return response;
  }

  async getConversationById(conversationId: number): Promise<Conversation> {
    const response = await getChatAuth<Conversation>(`chat/conversations/${conversationId}/`);
    return response;
  }

  async startConversation(userId: number): Promise<Conversation> {
    const response = await postChatAuth<Conversation>("chat/conversations/start/", {
      user_id: userId,
    });
    return response;
  }

  async getMessages(conversationId: number, page: number = 1): Promise<MessagesResponse> {
    const response = await getChatAuth<MessagesResponse>(
      `chat/conversations/${conversationId}/messages/?page=${page}`
    );
    return response;
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    const response = await postChatAuth<Message>("chat/send/", payload);
    return response;
  }

  async markAsRead(conversationId: number, messageIds: number[]): Promise<void> {
    await postChatAuth(`chat/conversations/${conversationId}/read/`, {
      message_ids: messageIds,
    });
  }
}
