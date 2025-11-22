import { Connection } from "../entities/Connection";

export interface IConnectionRepository {
  getConnections(): Promise<Connection[]>;
  toggleConnection(id: number): Promise<Connection[]>;
}
