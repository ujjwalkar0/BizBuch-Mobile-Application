import { IChatRepository } from "../repositories/IChatRepository";
import { Conversation } from "../entities/Conversation";

export class GetConversations {
  constructor(private chatRepository: IChatRepository) {}

  async execute(): Promise<Conversation[]> {
    return this.chatRepository.getConversations();
  }
}

export class GetConversationById {
  constructor(private chatRepository: IChatRepository) {}

  async execute(conversationId: number): Promise<Conversation> {
    return this.chatRepository.getConversationById(conversationId);
  }
}

export class StartConversation {
  constructor(private chatRepository: IChatRepository) {}

  async execute(userId: number): Promise<Conversation> {
    return this.chatRepository.startConversation(userId);
  }
}
