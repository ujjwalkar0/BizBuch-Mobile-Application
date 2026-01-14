import { AuthRepository } from "../data/repositories/AuthRepository";
import { PostRepository } from "../data/repositories/PostRepository";
import { ConnectionRepository } from "../data/repositories/ConnectionRepository";
import { ProfileRepository } from "../data/repositories/ProfileRepository";
import { ChatRepository } from "../data/repositories/ChatRepository";
import { IAuthRepository } from "../domain/auth/repositories/IAuthRepository";
import { IPostRepository } from "../domain/post/repositories/IPostRepository";
import { IConnectionRepository } from "../domain/user/repositories/IConnectionRepository";
import { IProfileRepository } from "../domain/user/repositories/IProfileRepository";
import { IChatRepository } from "../domain/chat/repositories/IChatRepository";
import { GetNewsFeed } from "../domain/post/usecases/queries/GetNewsFeed";
import { GetProfileById } from "../domain/user/usecases/GetProfileById";
import { GetCurrentUserProfile } from "../domain/user/usecases/GetCurrentUserProfile";

export const authRepository: IAuthRepository = new AuthRepository();
export const postRepository: IPostRepository = new PostRepository();
export const connectionRepository: IConnectionRepository = new ConnectionRepository();
export const profileRepository: IProfileRepository = new ProfileRepository();
export const chatRepository: IChatRepository = new ChatRepository();

export const getNewsFeedUseCase = new GetNewsFeed(postRepository);
export const getProfileByIdUseCase = new GetProfileById(profileRepository);
export const getCurrentUserProfileUseCase = new GetCurrentUserProfile(profileRepository);