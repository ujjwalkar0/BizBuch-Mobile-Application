import { AuthRepository } from "./infrastructure/repositories/AuthRepository";
import { PostRepository } from "./infrastructure/repositories/PostRepository";
import { ConnectionRepository } from "./infrastructure/repositories/ConnectionRepository";
import { ProfileRepository } from "./infrastructure/repositories/ProfileRepository";
import { ChatRepository } from "./infrastructure/repositories/ChatRepository";
import { ActivityLogRepository } from "./infrastructure/repositories/ActivityLogRepository";
import { NotificationRepository } from "./infrastructure/repositories/NotificationRepository";
import { CommentRepository } from "./infrastructure/repositories/CommentRepository";

import { IAuthRepository } from "./domain/auth/repositories/IAuthRepository";
import { IPostRepository } from "./domain/post/repositories/IPostRepository";
import { IConnectionRepository } from "./domain/user/repositories/IConnectionRepository";
import { IProfileRepository } from "./domain/user/repositories/IProfileRepository";
import { IChatRepository } from "./domain/chat/repositories/IChatRepository";
import { IActivityLogRepository } from "./domain/activity/repositories/IActivityLogRepository";
import { INotificationRepository } from "./domain/notification/repositories/INotificationRepository";
import { ICommentRepository } from "./domain/post/repositories/ICommentRepository";

export const authRepository: IAuthRepository = new AuthRepository();
export const postRepository: IPostRepository = new PostRepository();
export const connectionRepository: IConnectionRepository = new ConnectionRepository();
export const profileRepository: IProfileRepository = new ProfileRepository();
export const chatRepository: IChatRepository = new ChatRepository();
export const activityLogRepository: IActivityLogRepository = new ActivityLogRepository();
export const notificationRepository: INotificationRepository = new NotificationRepository();
export const commentRepository: ICommentRepository = new CommentRepository();