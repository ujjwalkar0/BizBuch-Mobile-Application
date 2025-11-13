import { Connection } from "../../domain/user/entities/Connection";
import { IConnectionRepository } from "../../domain/user/repositories/IConnectionRepository";
import { mockConnections } from "../datasources/MockConnectionDataSource";

export class ConnectionRepository implements IConnectionRepository {
  private connections: Connection[] = [...mockConnections];

  async getConnections(): Promise<Connection[]> {
    return Promise.resolve(this.connections);
  }

  async toggleConnection(id: number): Promise<Connection[]> {
    this.connections = this.connections.map((conn) =>
      conn.id === id ? { ...conn, isConnected: !conn.isConnected } : conn
    );
    return Promise.resolve(this.connections);
  }
}
