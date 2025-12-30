import { useForm } from 'react-hook-form';

export type LoginFormData = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const rules = {
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
  };

  return {
    ...form,
    rules,
  };
};
