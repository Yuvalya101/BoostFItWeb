import { _delete, get, post } from ".";
import { Comment, Post } from "../types";

export function getPosts() {
  return get<Post[]>("/posts");
}

export function createPost(postData: Omit<Post, "_id">) {
  return post<Omit<Post, "_id">, Post>("/posts", postData);
}
export function updatePost(postId: string, postData: Partial<Omit<Post, "_id">>) {
  return post<Partial<Omit<Post, "_id">>, Post>(`/posts/${postId}`, postData);
}

export function likePost(postId: string) {
  return post<any, Post>(`/posts/like/${postId}`, null);
}

export function commentPost(postId: string, content: string) {
  return post<any, Comment>(`/posts/comment/${postId}`, {content});
}
export function unlikePost(postId: string) {
  return post<any, Post>(`/posts/unlike/${postId}`, null);
}

export function deletePost(postId: string) {
  return _delete(`/posts/${postId}`);
}
