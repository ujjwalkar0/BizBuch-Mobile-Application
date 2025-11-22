import { Author } from './Author';

export interface Post {
  id: string;
  author: Author;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}
