import mongoose from "mongoose";
import { comparePassword, encryptPassword } from "../utils";

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  comparePassword: (passwordText: string) => boolean;
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      unique: [true, "Email address must be unique"],
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    image: {
      type: String,
      required: false,
      default:
        "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png",
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", function (this) {
  if (this.isModified("password")) {
    this.password = encryptPassword(this.password);
  }
});

UserSchema.methods.comparePassword = function (passwordText: string) {
  return comparePassword(this.password, passwordText);
};

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
