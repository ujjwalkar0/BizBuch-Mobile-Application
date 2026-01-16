import { IChatRepository } from "../repositories/IChatRepository";
import { Message, MessagesResponse, SendMessagePayload } from "../entities/Message";

export class GetMessages {
  constructor(private chatRepository: IChatRepository) {}

  async execute(conversationId: number, page?: number): Promise<MessagesResponse> {
    return this.chatRepository.getMessages(conversationId, page);
  }
}

export class SendMessage {
  constructor(private chatRepository: IChatRepository) {}

  async execute(payload: SendMessagePayload): Promise<Message> {
    return this.chatRepository.sendMessage(payload);
  }
}

export class MarkMessagesAsRead {
  constructor(private chatRepository: IChatRepository) {}

  async execute(conversationId: number, messageIds: number[]): Promise<void> {
    return this.chatRepository.markAsRead(conversationId, messageIds);
  }
}
