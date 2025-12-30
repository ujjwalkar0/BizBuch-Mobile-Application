import { useMutation } from '@tanstack/react-query';
import { LoginPayload, AuthResponse } from '../../domain/auth/entities/Auth';
import { authRepository } from '../di';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authRepository.login(payload),
  });
}
