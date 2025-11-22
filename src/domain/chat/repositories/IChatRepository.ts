// domain/chat/repositories/IChatRepository.ts
import { Chat } from "../entities/Chat";

export interface IChatRepository {
  getChats(): Promise<Chat[]>;
}
