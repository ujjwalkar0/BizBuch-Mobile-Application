/**
 * AddWorkExperienceForm Types
 * Single Responsibility: Define form values for work experience creation
 */

export type EmploymentType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship'
  | 'freelance';

export interface AddWorkExperienceFormValues {
  company_name: string;
  job_title: string;
  location: string;
  employment_type: EmploymentType;
  start_year: number;
  start_month: number;
  end_year?: number;
  end_month?: number;
  is_current: boolean;
  description: string;
  skills: string;
}

export interface AddWorkExperienceRequestBody {
  company_name: string;
  job_title: string;
  location: string;
  employment_type: string;
  start_year: number;
  start_month: number;
  end_year?: number;
  end_month?: number;
  is_current: boolean;
  company_logo_key?: string;
  description: string;
  skills: string;
}
