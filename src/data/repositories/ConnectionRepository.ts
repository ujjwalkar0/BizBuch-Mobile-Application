import { Connection } from "../../domain/user/entities/Connection";
import { IConnectionRepository } from "../../domain/user/repositories/IConnectionRepository";
import { getAuth, postAuth } from "../../core/http";

export class ConnectionRepository implements IConnectionRepository {
  async getProfiles(): Promise<Connection[]> {
    return getAuth<Connection[]>("profiles/");
  }

  async getMyConnections(): Promise<Connection[]> {
    return getAuth<Connection[]>("profiles/connections");
  }

  async sendConnectionRequest(userId: number): Promise<void> {
    return postAuth<void>(`profiles/${userId}/follow/`, {});
  }

  async removeConnection(userId: number): Promise<void> {
    return postAuth<void>(`profiles/${userId}/unfollow/`, {});
  }
}
