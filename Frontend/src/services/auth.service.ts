import { UserLogin, UserRegistration } from "../validations";
import { _delete, get, post, put } from ".";
import { User } from "../types";

export async function register(data: UserRegistration) {
  return post<UserRegistration, User>("auth/register", data);
}

export async function login(data: UserLogin) {
  return post<UserLogin, string>("auth/login", data);
}

export async function updateUser(data: Partial<UserRegistration>) {
  return put<Partial<UserRegistration>, string>("auth", data);
}
export async function deleteUser() {
  return _delete<User>("auth");
}
export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  return post<any, string>("upload", formData, { "Content-Type": "multipart/form-data" });
}

export async function me() {
  return get<User>("auth/me");
}
