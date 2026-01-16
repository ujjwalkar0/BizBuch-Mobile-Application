import { IConnectionRepository } from "../repositories/IConnectionRepository";
import { Connection } from "../entities/Connection";

export class GetProfiles {
  constructor(private repo: IConnectionRepository) {}

  async execute(): Promise<Connection[]> {
    return this.repo.getProfiles();
  }
}

export class GetMyConnections {
  constructor(private repo: IConnectionRepository) {}

  async execute(): Promise<Connection[]> {
    return this.repo.getMyConnections();
  }
}