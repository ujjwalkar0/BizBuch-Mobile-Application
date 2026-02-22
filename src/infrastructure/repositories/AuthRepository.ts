import { IAuthRepository } from '../../domain/auth/repositories/IAuthRepository';
import {
  RegisterPayload,
  AuthResponse,
  LoginPayload,
  MessageResponse,
  TokenValidationResponse,
} from '../../domain/auth/entities/Auth';
import { post } from '../../core/http';

export class AuthRepository implements IAuthRepository {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return post<AuthResponse>('auth/login/', payload);
  }

  async register(payload: RegisterPayload): Promise<MessageResponse> {
    return post<MessageResponse>('auth/register/', payload);
  }

  async verifyOtp(email: string, otp: string): Promise<MessageResponse> {
    return post<MessageResponse>('auth/verify-otp/', {
      email,
      otp,
    });
  }

  async validateToken(token: string): Promise<TokenValidationResponse> {
    return post<TokenValidationResponse>('auth/validate-token/', {
      token,
    });
  }
}
