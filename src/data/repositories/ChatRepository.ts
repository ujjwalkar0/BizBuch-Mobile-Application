// data/chat/ChatRepository.ts
import { IChatRepository } from "../../domain/chat/repositories/IChatRepository";
import { Chat } from "../../domain/chat/entities/Chat";
import { MockChatData } from "../datasources/MockChatData";

export class ChatRepository implements IChatRepository {
  async getChats(): Promise<Chat[]> {
    return [...MockChatData]; // safe copy
  }
}
