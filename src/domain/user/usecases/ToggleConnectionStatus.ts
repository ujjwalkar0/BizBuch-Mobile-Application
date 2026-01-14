import { IConnectionRepository } from "../repositories/IConnectionRepository";

export class SendConnectionRequest {
  constructor(private repo: IConnectionRepository) {}

  async execute(userId: number): Promise<void> {
    return this.repo.sendConnectionRequest(userId);
  }
}

export class RemoveConnection {
  constructor(private repo: IConnectionRepository) {}

  async execute(userId: number): Promise<void> {
    return this.repo.removeConnection(userId);
  }
}
