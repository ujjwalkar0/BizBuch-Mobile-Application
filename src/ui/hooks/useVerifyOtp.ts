import { useMutation } from '@tanstack/react-query';
import { AuthRepository } from '../../data/repositories/AuthRepository';

const authRepository = new AuthRepository();

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authRepository.verifyOtp(email, otp),
  });
};
