import { Profile } from "../entities/Profile";

export interface UpdateLocationData {
  location: string;
  is_primary?: boolean;
  location_type?: "current" | "hometown" | "other";
}

export interface UpdateProfileData {
  display_name?: string;
  bio?: string;
  avatar?: string;
  headline?: string;
  current_position?: string;
  company?: string;
  industry?: string;
  company_logo?: string;
  cover_image?: string;
  locations?: UpdateLocationData[];
  phone?: string;
  website?: string;
  linkedin_url?: string;
  twitter_url?: string;
  account_type?: "personal" | "business";
  open_to_work?: boolean;
  open_to_hire?: boolean;
  is_public?: boolean;
}

export interface IProfileRepository {
  getCurrentUserProfile(): Promise<Profile>;
  getProfileById(userId: number): Promise<Profile | null>;
  updateProfile(data: UpdateProfileData): Promise<Profile>;
}
