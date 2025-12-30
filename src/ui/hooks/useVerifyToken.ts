import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../di';


export const useVerifyToken = () =>
  useMutation({
    mutationFn: ({ token }: { token: string }) =>
      authRepository.validateToken(token),
  });
