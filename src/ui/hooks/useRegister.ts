import { useMutation } from '@tanstack/react-query';
import {
  RegisterPayload,
  MessageResponse,
} from '../../domain/auth/entities/Auth';
import { authRepository } from '../di';

export const useRegister = () =>
  useMutation<MessageResponse, Error, RegisterPayload>({
    mutationFn: payload => authRepository.register(payload),
  });
