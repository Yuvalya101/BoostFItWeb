export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  posts: Post[];
};

export type Comment = {
  _id: string
  content: string;
  user: User;
  post: string;
};

export type Post = {
  _id: string;
  content: string;
  image: string;
  createdAt: string;
  comments: Comment[];
  likes: string[];
  user: User | string;
};
