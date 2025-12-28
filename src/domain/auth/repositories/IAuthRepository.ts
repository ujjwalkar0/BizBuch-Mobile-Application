import { AuthResponse, RegisterPayload } from "../entities/Auth";

export interface IAuthRepository {
  register(payload: RegisterPayload): Promise<AuthResponse>;
}
