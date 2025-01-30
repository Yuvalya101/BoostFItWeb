import mongoose, { ObjectId } from "mongoose";

export interface Post {
  _id: string;
  content: string;
  user: ObjectId;
  image: string;
  likes: ObjectId[];
  comments: ObjectId[];
  createdAt: Date;
}

const PostSchema = new mongoose.Schema<Post>(
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
    image: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;
