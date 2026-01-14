import { Connection } from "../entities/Connection";

export interface IConnectionRepository {
  getProfiles(): Promise<Connection[]>;
  getMyConnections(): Promise<Connection[]>;
  sendConnectionRequest(userId: number): Promise<void>;
  removeConnection(userId: number): Promise<void>;
}
