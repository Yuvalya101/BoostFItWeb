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

export async function createPost(data: PostCreation) {
  return await PostModel.create(data);
}
export async function deletePost(id: string) {
  const deleted = await PostModel.findByIdAndDelete(id, { returnOriginal: true });
  // remove all comments related to the post
  await CommentsModel.deleteMany({ post: id });
  // remove the post from the user's posts array
  await UserModel.findByIdAndUpdate(deleted!.user, { $pull: { posts: deleted!._id } });
}
export async function updatePost(id: string, data: PostUpdate) {
  return await PostModel.findByIdAndUpdate(id, data, { returnOriginal: false });
}
