export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
<<<<<<< HEAD
};
=======
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
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
