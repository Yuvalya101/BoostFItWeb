import CommentsModel from "../models/comment.model";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { PostCreation, PostUpdate } from "../validation/post.validation";

export async function findPostById(id: string) {
  return await PostModel.findById(id)
    .populate("user")
    /* populate commenets, and user under comment*/
    .populate({ path: "comments", populate: { path: "user" } });
}
export async function findPosts() {
  return await PostModel.find()
    .populate("user")
    /* populate commenets, and user under comment*/
    .populate({ path: "comments", populate: { path: "user" } });
}
export async function findPostsByUserId(userId: string) {
  return await PostModel.find({ user: userId })
    .populate("user")
    /* populate commenets, and user under comment*/
    .populate({ path: "comments", populate: { path: "user" } });
}

export async function createPost(data: PostCreation, userId: string) {
  let post: any = await PostModel.create({ ...data, user: userId });
  post = await PostModel.findById(post._id).populate("user");
  await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });
  return post;
}
export async function deletePost(id: string) {
  const deleted = await PostModel.findByIdAndDelete(id, { returnOriginal: true });
  // remove all comments related to the post
  await CommentsModel.deleteMany({ post: id });
  // remove the post from the user's posts array
  await UserModel.findByIdAndUpdate(deleted!.user, { $pull: { posts: deleted!._id } });
}
export async function updatePost(id: string, data: PostUpdate) {
  return await PostModel.findByIdAndUpdate(id, data, { returnOriginal: false }).populate("user");
}
export async function commentPost(postId: string, userId: string, content: string) {
  let comment: any = await CommentsModel.create({ content, user: userId, post: postId });
  await PostModel.findByIdAndUpdate(
    postId,
    { $push: { comments: comment._id } },
    { returnOriginal: false }
  );
  comment = await CommentsModel.findById(comment._id).populate("user");
  return comment;
}

export async function likePost(id: string, userId: string) {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { returnOriginal: false }
  ).populate("user");
  await UserModel.findByIdAndUpdate(userId, { $addToSet: { likedPosts: post!._id } });
  return post;
}
export async function unlikePost(id: string, userId: string) {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { returnOriginal: false }
  ).populate("user");
  await UserModel.findByIdAndUpdate(userId, { $pull: { likedPosts: post!._id } });
  return post;
}
