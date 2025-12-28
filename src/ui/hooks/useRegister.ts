import { useMutation } from '@tanstack/react-query';
import { AuthRepository } from '../../data/repositories/AuthRepository';
import { RegisterPayload, AuthResponse } from '../../domain/auth/entities/Auth';

const authRepository = new AuthRepository();

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload) => authRepository.register(payload),
  });
}
