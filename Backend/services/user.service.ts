import UserModel from "../models/user.model";
import { UserRegistration } from "../validation/user.validation";

export async function findUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}
export async function findUserById(id: string) {
  return await UserModel.findById(id);
}

export async function updateUser(id: string, data: Partial<UserRegistration>) {
  return await UserModel.findByIdAndUpdate(id, data, { returnOriginal: false });
}
export async function deleteUser(id: string) {
  return await UserModel.findByIdAndDelete(id);
}

export async function createUser(data: UserRegistration) {
  return await UserModel.create({ ...data, posts: [] });
}
