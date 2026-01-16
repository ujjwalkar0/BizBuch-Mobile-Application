import { IProfileRepository } from "../repositories/IProfileRepository";
import { Profile } from "../entities/Profile";

export class GetProfileById {
  constructor(private repo: IProfileRepository) {}

  async execute(userId: number): Promise<Profile | null> {
    return this.repo.getProfileById(userId);
  }
}
