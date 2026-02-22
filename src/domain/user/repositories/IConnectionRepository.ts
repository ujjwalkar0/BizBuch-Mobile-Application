import { Connection } from "../entities/Connection";

export interface IConnectionRepository {
  getProfileSuggestions(): Promise<Connection[]>;
  getMyConnections(): Promise<Connection[]>;
  sendConnectionRequest(userId: number): Promise<void>;
  removeConnection(userId: number): Promise<void>;
}
