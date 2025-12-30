import { AuthRepository } from "../data/repositories/AuthRepository";
import { IAuthRepository } from "../domain/auth/repositories/IAuthRepository";

export const authRepository: IAuthRepository = new AuthRepository();