import UserModel from "../models/user.model";
import { UserRegistration } from "../validation/user.validation";

export async function findUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}
export async function findUserById(id: string) {
  return await UserModel.findById(id);
}

export async function createUser(data: UserRegistration) {
  return await UserModel.create(data);
}
