/**
 * AddEducationForm Types
 * Single Responsibility: Define form values for education creation
 */

export type DegreeType =
  | 'high-school'
  | 'associate'
  | 'bachelor'
  | 'master'
  | 'doctorate'
  | 'certificate'
  | 'diploma'
  | 'other';

export interface AddEducationFormValues {
  school_name: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  description: string;
}

export interface AddEducationRequestBody {
  name: string;
  degrees: string;
  field_of_study: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  school_logo_key?: string;
  description: string;
}
