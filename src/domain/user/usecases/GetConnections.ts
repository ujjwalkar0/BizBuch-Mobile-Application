import { IConnectionRepository } from "../repositories/IConnectionRepository";
import { Connection } from "../entities/Connection";

export class GetConnections {
  constructor(private repo: IConnectionRepository) {}

  async execute(): Promise<Connection[]> {
    return this.repo.getConnections();
  }
}