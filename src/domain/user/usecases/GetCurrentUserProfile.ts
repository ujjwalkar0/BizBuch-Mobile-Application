import { IProfileRepository } from "../repositories/IProfileRepository";
import { Profile } from "../entities/Profile";

export class GetCurrentUserProfile {
  constructor(private repo: IProfileRepository) {}

  async execute(): Promise<Profile> {
    return this.repo.getCurrentUserProfile();
  }
}
