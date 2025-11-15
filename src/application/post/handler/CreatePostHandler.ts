import { Post } from "../../../domain/post/entities/Post";
import { IPostRepository } from "../../../domain/post/repositories/IPostRepository";
import { CreatePost } from "../../../domain/post/usecases/commands/CreatePost";

export class CreatePostHandler {
  private createPostUseCase: CreatePost;

  constructor(private repository: IPostRepository) {
    this.createPostUseCase = new CreatePost(repository);
  }

  async handle(
    content: string,
    authorId: string,
    audience: "Public" | "Friends" | "Only Me",
    image?: string
  ): Promise<Post> {
    if (!content.trim() && !image) {
      throw new Error("Post must have content or image.");
    }

    return this.createPostUseCase.execute({
      authorId,
      content,
      image,
      audience,
    });
  }
}
