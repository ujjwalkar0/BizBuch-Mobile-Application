import { IAuthRepository } from '../../domain/auth/repositories/IAuthRepository';
import {
  RegisterPayload,
  AuthResponse,
  LoginPayload,
} from '../../domain/auth/entities/Auth';
import { post } from '../../core/http';

export class AuthRepository implements IAuthRepository {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return post<AuthResponse>('/auth/login/', payload);
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return post<AuthResponse>('/auth/register/', payload);
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    await post('/auth/verify-otp/', {
      email,
      otp,
    });
  }
}
