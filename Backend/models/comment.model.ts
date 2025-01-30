import mongoose, { ObjectId } from "mongoose";

export interface Comment {
  _id: string;
  content: string;
  user: ObjectId;
  post: ObjectId;
}

const CommentSchema = new mongoose.Schema<Comment>(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  {
    versionKey: false,
  }
);

const CommentsModel = mongoose.model("comments", CommentSchema);
export default CommentsModel;
