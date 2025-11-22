import { Post } from "../../domain/post/entities/Post";
import { IPostRepository } from "../../domain/post/repositories/IPostRepository";
import { mockPosts } from "../datasources/MockPostDataSource";

export class PostRepository implements IPostRepository {
  posts:Post[] = [...mockPosts]

  async getAllPosts(): Promise<Post[]> {
    return Promise.resolve(mockPosts);
  }

  async createPost(postData: Omit<Post, "id" | "timestamp" | "likes" | "comments" | "shares">): Promise<Post> {
    const newPost: Post = {
      author: postData.author,
      content: postData.content,
      image: postData.image,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      id: ""
    };

    mockPosts.push(newPost);

    return Promise.resolve(newPost);
  }

  async getPostById(id: string) {
  return this.posts.find(p => p.id === id) || null;
}

}