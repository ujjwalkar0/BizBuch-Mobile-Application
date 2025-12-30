import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../di';

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authRepository.verifyOtp(email, otp),
  });
