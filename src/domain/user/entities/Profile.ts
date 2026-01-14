export interface Location {
  id: number;
  location: string;
  is_primary: boolean;
  location_type: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  name: string;
  degrees: string;
  duration: string;
  start_year: number;
  end_year: number;
  is_current: boolean;
  school_logo: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  employment_type: string;
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
  is_current: boolean;
  company_logo: string;
  description: string;
  skills: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  display_name: string;
  username: string;
  bio: string;
  avatar: string;
  headline: string;
  current_position: string;
  company: string;
  company_logo: string;
  industry: string;
  locations: Location[];
  phone: string;
  website: string;
  linkedin_url: string;
  twitter_url: string;
  connections_count: string;
  followers_count: string;
  following_count: string;
  posts_count: string;
  is_connected: string;
  is_following: string;
  mutual_connections_count: string;
  is_verified: boolean;
  is_premium: boolean;
  account_type: string;
  cover_image: string;
  joined_date: string;
  skills: string[];
  educations: Education[];
  work_experiences: WorkExperience[];
  open_to_work: boolean;
  open_to_hire: boolean;
}
