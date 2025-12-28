import { IAuthRepository } from '../../domain/auth/repositories/IAuthRepository';
import { RegisterPayload, AuthResponse } from '../../domain/auth/entities/Auth';
import { post } from '../../core/http';

export class AuthRepository implements IAuthRepository {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return post<AuthResponse>('/auth/register/', payload);
  }
}
