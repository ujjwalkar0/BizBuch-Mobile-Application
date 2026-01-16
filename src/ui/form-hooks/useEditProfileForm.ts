import { useForm } from 'react-hook-form';
import { EditProfileFormValues } from '../form-types/EditProfileForm.types';

export const useEditProfileForm = (defaultValues?: Partial<EditProfileFormValues>) => {
  const form = useForm<EditProfileFormValues>({
    defaultValues: {
      display_name: '',
      username: '',
      bio: '',
      headline: '',
      current_position: '',
      company: '',
      industry: '',
      phone: '',
      website: '',
      linkedin_url: '',
      twitter_url: '',
      avatarUri: null,
      coverImageUri: null,
      ...defaultValues,
    },
  });

  const rules = {
    display_name: {
      required: 'Display name is required',
      minLength: {
        value: 2,
        message: 'Display name must be at least 2 characters',
      },
    },
    username: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters',
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: 'Username can only contain letters, numbers, and underscores',
      },
    },
    bio: {
      maxLength: {
        value: 500,
        message: 'Bio must be less than 500 characters',
      },
    },
    headline: {
      maxLength: {
        value: 120,
        message: 'Headline must be less than 120 characters',
      },
    },
    website: {
      pattern: {
        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        message: 'Please enter a valid URL',
      },
    },
    linkedin_url: {
      pattern: {
        value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/,
        message: 'Please enter a valid LinkedIn URL',
      },
    },
    twitter_url: {
      pattern: {
        value: /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/,
        message: 'Please enter a valid Twitter URL',
      },
    },
    phone: {
      pattern: {
        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
        message: 'Please enter a valid phone number',
      },
    },
  };

  return {
    ...form,
    rules,
  };
};
