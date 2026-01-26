export interface CurrentWork {
  job_title: string;
  company_name: string;
}

export interface Connection {
  id: number;
  display_name: string;
  username: string;
  avatar: string;
  headline: string;
  current_work: CurrentWork;
  is_verified: boolean;
  followers_count: string;
}