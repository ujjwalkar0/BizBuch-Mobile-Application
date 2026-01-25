import { useForm } from 'react-hook-form';
import {
  AddWorkExperienceFormValues,
  EmploymentType,
} from '../form-types/AddWorkExperienceForm.types';

/**
 * useAddWorkExperienceForm Hook
 * SOLID Principles:
 * - Single Responsibility: Form setup and validation rules
 * - Open/Closed: Extensible through default values
 */
export const useAddWorkExperienceForm = (
  defaultValues?: Partial<AddWorkExperienceFormValues>,
) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const form = useForm<AddWorkExperienceFormValues>({
    defaultValues: {
      company_name: '',
      job_title: '',
      location: '',
      employment_type: 'full-time' as EmploymentType,
      start_year: currentYear,
      start_month: currentMonth,
      end_year: undefined,
      end_month: undefined,
      is_current: false,
      description: '',
      skills: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const rules = {
    company_name: {
      required: 'Company name is required',
      minLength: {
        value: 2,
        message: 'Company name must be at least 2 characters',
      },
    },
    job_title: {
      required: 'Job title is required',
      minLength: {
        value: 2,
        message: 'Job title must be at least 2 characters',
      },
    },
    location: {
      required: 'Location is required',
    },
    start_year: {
      required: 'Start year is required',
      min: {
        value: 1950,
        message: 'Start year must be 1950 or later',
      },
      max: {
        value: currentYear,
        message: `Start year cannot be after ${currentYear}`,
      },
    },
    start_month: {
      required: 'Start month is required',
      min: {
        value: 1,
        message: 'Month must be between 1 and 12',
      },
      max: {
        value: 12,
        message: 'Month must be between 1 and 12',
      },
    },
    end_year: {
      min: {
        value: 1950,
        message: 'End year must be 1950 or later',
      },
    },
    end_month: {
      min: {
        value: 1,
        message: 'Month must be between 1 and 12',
      },
      max: {
        value: 12,
        message: 'Month must be between 1 and 12',
      },
    },
    description: {
      maxLength: {
        value: 2000,
        message: 'Description cannot exceed 2000 characters',
      },
    },
    skills: {
      maxLength: {
        value: 500,
        message: 'Skills cannot exceed 500 characters',
      },
    },
  };

  return {
    ...form,
    rules,
  };
};
