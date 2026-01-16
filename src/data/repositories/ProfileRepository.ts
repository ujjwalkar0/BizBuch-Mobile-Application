import { Profile } from "../../domain/user/entities/Profile";
import { IProfileRepository, UpdateProfileData } from "../../domain/user/repositories/IProfileRepository";
import { getAuth, patchAuth } from "../../core/http";

export class ProfileRepository implements IProfileRepository {
  async getCurrentUserProfile(): Promise<Profile> {
    return getAuth<Profile>("profiles/me/");
  }

  async getProfileById(userId: number): Promise<Profile | null> {
    try {
      return await getAuth<Profile>(`profiles/${userId}/`);
    } catch {
      return null;
    }
  }

  async updateProfile(data: UpdateProfileData): Promise<Profile> {
    console.log("Updating profile with data:", data);
    return patchAuth<Profile>("profiles/me/", data);
  }
}
