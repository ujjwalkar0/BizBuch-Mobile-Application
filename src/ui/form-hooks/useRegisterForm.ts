import { useForm } from 'react-hook-form';
import { RegisterPayload } from '../../domain/auth/entities/Auth';


export const useRegisterForm = () => {
  const form = useForm<RegisterPayload>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      recaptcha_token: '123',
    },
  });

  const password = form.watch('password');

  const rules = {
    first_name: {
      required: 'First name is required',
    },
    last_name: {
      required: 'Last name is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email address',
      },
    },
    username: {
      required: 'Username is required',
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Minimum 6 characters',
      },
    },
    confirm_password: {
      required: 'Confirm your password',
      validate: (value: string) =>
        value === password || 'Passwords do not match',
    },
  };

  return {
    ...form,
    rules,
  };
};
