import { Request, Response } from "express";
import {
  PostCreationValidationScheme,
  PostUpdateValidationScheme,
} from "../validation/post.validation";
import * as PostService from "../services/posts.service";

export async function likePost(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const userId = request.user!.id;
    const post = await PostService.likePost(id, userId);
    response.status(201).json({
      error: null,
      status: 201,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function unlikePost(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const userId = request.user!.id;
    const post = await PostService.unlikePost(id, userId);
    response.status(201).json({
      error: null,
      status: 201,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}
export async function createPost(request: Request, response: Response) {
  try {
    const data = request.body;
    const validatedData = PostCreationValidationScheme.parse(data);
    const post = await PostService.createPost(validatedData, request.user!.id);
    response.status(201).json({
      error: null,
      status: 201,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function commentPost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const { content } = request.body;
    const user = request.user!.id;
    const post = await PostService.commentPost(postId, user, content);
    response.status(200).json({
      error: null,
      status: 200,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
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
      status: 200,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function deletePost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const post = await PostService.deletePost(postId);
    response.status(200).json({
      error: null,
      status: 200,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getPosts(request: Request, response: Response) {
  try {
    const posts = await PostService.findPosts();
    response.status(200).json({
      error: null,
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getUserPosts(request: Request, response: Response) {
  try {
    const userId = request.params.id.replace("{", "").replace("}", "");
    const posts = await PostService.findPostsByUserId(userId);
    response.status(200).json({
      error: null,
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error: any) {
    console.log(error);
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}

export async function getPost(request: Request, response: Response) {
  try {
    const postId = request.params.id;
    const post = await PostService.findPostById(postId);
    response.status(200).json({
      error: null,
      status: 200,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error: any) {
    response
      .status(400)
      .json({ error, message: error.message, data: null, status: 400 });
  }
}
