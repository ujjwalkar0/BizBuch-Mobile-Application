import { Profile } from "../../domain/user/entities/Profile";
import { IProfileRepository, UpdateProfileData, AddWorkExperienceData, AddEducationData } from "../../domain/user/repositories/IProfileRepository";
import { getAuth, patchAuth, postAuth } from "../../core/http";

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

  async addWorkExperience(data: AddWorkExperienceData): Promise<void> {
    await postAuth<void>("profiles/me/work-experiences/", data);
  }

  async addEducation(data: AddEducationData): Promise<void> {
    await postAuth<void>("profiles/me/education/", data);
  }

  async followUser(userId: number): Promise<void> {
    await postAuth<void>(`profiles/${userId}/follow/`, {});
  }
}
