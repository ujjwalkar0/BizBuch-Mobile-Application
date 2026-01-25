import { useForm } from 'react-hook-form';
import { AddEducationFormValues } from '../form-types/AddEducationForm.types';

/**
 * useAddEducationForm Hook
 * SOLID Principles:
 * - Single Responsibility: Form setup and validation rules
 * - Open/Closed: Extensible through default values
 */
export const useAddEducationForm = (
  defaultValues?: Partial<AddEducationFormValues>,
) => {
  const currentYear = new Date().getFullYear();

  const form = useForm<AddEducationFormValues>({
    defaultValues: {
      school_name: '',
      degree: '',
      field_of_study: '',
      start_year: currentYear,
      end_year: undefined,
      is_current: false,
      description: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const rules = {
    school_name: {
      required: 'School name is required',
      minLength: {
        value: 2,
        message: 'School name must be at least 2 characters',
      },
    },
    degree: {
      required: 'Degree is required',
      minLength: {
        value: 2,
        message: 'Degree must be at least 2 characters',
      },
    },
    field_of_study: {
      maxLength: {
        value: 200,
        message: 'Field of study cannot exceed 200 characters',
      },
    },
    start_year: {
      required: 'Start year is required',
      min: {
        value: 1950,
        message: 'Start year must be 1950 or later',
      },
      max: {
        value: currentYear + 10,
        message: `Start year cannot be after ${currentYear + 10}`,
      },
    },
    end_year: {
      min: {
        value: 1950,
        message: 'End year must be 1950 or later',
      },
    },
    description: {
      maxLength: {
        value: 2000,
        message: 'Description cannot exceed 2000 characters',
      },
    },
  };

  return {
    ...form,
    rules,
  };
};
