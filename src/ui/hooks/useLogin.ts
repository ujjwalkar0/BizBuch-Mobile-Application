import { useMutation } from '@tanstack/react-query';
import { AuthRepository } from '../../data/repositories/AuthRepository';
import { LoginPayload, AuthResponse } from '../../domain/auth/entities/Auth';

const authRepository = new AuthRepository();

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authRepository.login(payload),
  });
}
