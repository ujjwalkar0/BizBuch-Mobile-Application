import { Post } from "../../domain/post/entities/Post";

export const mockPosts: Post[] = [
  {
    author: {
      name: "Alex Thompson",
      username: "@alexthompson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      title: "CEO at TechVision Inc.",
    },
    content:
      "Excited to announce our new AI-powered platform! 🚀\n\n#AI #Innovation #TechLaunch",
    image:
      "https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    timestamp: "2 hours ago",
    likes: 1247,
    comments: 89,
    shares: 45,
  },
  {
    author: {
      name: "Maria Garcia",
      username: "@mariagarcia",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
      title: "Product Manager at Innovate Labs",
    },
    content: "Working with an amazing team makes the difference 💼✨",
    image:
      "https://images.unsplash.com/photo-1690264421892-46e3af5c3455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    timestamp: "5 hours ago",
    likes: 892,
    comments: 56,
    shares: 23,
  },
];
