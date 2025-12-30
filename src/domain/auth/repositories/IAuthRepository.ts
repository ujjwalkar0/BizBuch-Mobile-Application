import { AuthResponse, LoginPayload, MessageResponse, RegisterPayload, TokenValidationResponse } from '../entities/Auth';

export interface IAuthRepository {
  login(payload: LoginPayload): Promise<AuthResponse>;
  register(payload: RegisterPayload): Promise<MessageResponse>;
  verifyOtp(email: string, otp: string): Promise<MessageResponse>;
  validateToken(token: string): Promise<TokenValidationResponse>;
}
