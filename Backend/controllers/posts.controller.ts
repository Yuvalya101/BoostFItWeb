import { Request, Response } from "express";
import {
  PostCreationValidationScheme,
  PostUpdateValidationScheme,
} from "../validation/post.validation";
import * as PostService from "../services/posts.service";

export async function createPost(request: Request, response: Response) {
  try {
    const data = request.body;
    const validatedData = PostCreationValidationScheme.parse(data);
    const post = await PostService.createPost(validatedData);
    response.status(200).json({
      error: null,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function updatePost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const data = request.body;
    const validatedData = PostUpdateValidationScheme.parse(data);
    const post = await PostService.updatePost(postId, validatedData);
    response.status(200).json({
      error: null,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function deletePost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const post = await PostService.deletePost(postId);
    response.status(200).json({
      error: null,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getPosts(request: Request, response: Response) {
  try {
    const posts = await PostService.findPosts();
    response.status(200).json({
      error: null,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getUserPosts(request: Request, response: Response) {
  try {
    const userId = request.params.id;
    const posts = await PostService.findPostsByUserId(userId);
    response.status(200).json({
      error: null,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getPost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const post = await PostService.findPostById(postId);
    response.status(200).json({
      error: null,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error: any) {
    response.status(400).json({ error, message: error.message, data: null, status: 400 });
  }
}
