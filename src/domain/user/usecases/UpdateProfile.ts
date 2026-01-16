import { IProfileRepository, UpdateProfileData } from "../repositories/IProfileRepository";
import { Profile } from "../entities/Profile";

export class UpdateProfile {
  constructor(private repo: IProfileRepository) {}

  async execute(data: UpdateProfileData): Promise<Profile> {
    return this.repo.updateProfile(data);
  }
}
