import React, { use, useEffect, useState } from "react";
import { Post, User } from "../types";
import * as PostService from "../services/post.service";
import { useUser } from "./Auth.context";
import { Comment } from "../types";
export interface IPostContext {
  posts: Post[];
  sharePost: (post: Omit<Post, "_id">) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  updatePost: (postId: string, post: Partial<Omit<Post, "_id">>) => Promise<void>;
  commentPost: (post: Post, content: string) => Promise<void>;
}

const PostContext = React.createContext<IPostContext | null>(null);

export function PostContextProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { addPost, removePost, updatePost: updateUserPost, user } = useUser();

  useEffect(() => {
    PostService.getPosts().then(setPosts);
  }, []);

  async function updatePost(postId: string, post: Partial<Omit<Post, "_id">>) {
    const p = await PostService.updatePost(postId, post);
    updateUserPost(postId, post);
    setPosts(posts.map((p) => (p._id === postId ? { ...p, ...post } : p)));
  }

  async function commentPost(post: Post, content: string) {
    const c = await PostService.commentPost(post._id, content);
    setPosts(posts.map((p) => (p._id === post._id ? { ...p, comments: [...p.comments, c] } : p)));
    post.comments.push(c);
    if ((c.user as User)._id === user!._id) {
      updateUserPost(post._id, post);
    }
  }

  async function deletePost(postId: string) {
    await PostService.deletePost(postId);
    removePost(postId);
    setPosts(posts.filter((p) => p._id !== postId));
  }
  async function sharePost(post: Omit<Post, "_id">) {
    const p = await PostService.createPost(post);
    addPost(p);
    setPosts([p, ...posts]);
  }
  async function likePost(postId: string) {
    const p = await PostService.likePost(postId);
    setPosts(posts.map((p) => (p._id === postId ? { ...p, likes: [...p.likes, user!._id] } : p)));
    if ((p.user as User)._id === user!._id) {
      updateUserPost(postId, { likes: [...p.likes, user!._id] });
    }
  }
  async function unlikePost(postId: string) {
    const p = await PostService.unlikePost(postId);
    setPosts(
      posts.map((p) =>
        p._id === postId ? { ...p, likes: p.likes.filter((l) => l !== user!._id) } : p
      )
    );
    if ((p.user as User)._id === user!._id) {
      updateUserPost(postId, { likes: p.likes.filter((l) => l !== user!._id) });
    }
  }

  return (
    <PostContext.Provider
      value={{ updatePost, deletePost, sharePost, posts, likePost, unlikePost, commentPost }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = use(PostContext);
  if (!context) {
    throw new Error("Post context not provided");
  }
  return context;
}
