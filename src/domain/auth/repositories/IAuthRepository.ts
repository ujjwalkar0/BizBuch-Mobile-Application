import { AuthResponse, LoginPayload, RegisterPayload } from '../entities/Auth';

export interface IAuthRepository {
  login(payload: LoginPayload): Promise<AuthResponse>;
  register(payload: RegisterPayload): Promise<AuthResponse>;
  verifyOtp(email: string, otp: string): Promise<void>;
}
