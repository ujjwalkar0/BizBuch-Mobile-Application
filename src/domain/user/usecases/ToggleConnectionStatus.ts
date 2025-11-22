import { IConnectionRepository } from "../repositories/IConnectionRepository";
import { Connection } from "../entities/Connection";

export class ToggleConnectionStatus {
  constructor(private repo: IConnectionRepository) {}

  async execute(id: number): Promise<Connection[]> {
    return this.repo.toggleConnection(id);
  }
}
