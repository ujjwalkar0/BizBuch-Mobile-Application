import { Author } from './Author';

export interface PostResponseBody {
  id: string;
  author: string;
  content: string;
  image_url?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}
export interface Poll{
  question: string;
  options: string[];
}

export interface PostRequestBody {
    privacy: string,
    content?: string,
    imageUrl?: string,
    poll?: Poll,
    location?: string,
    feeling?: string,
}
