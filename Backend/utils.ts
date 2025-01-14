import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(passwordHashed: string, passwordText: string) {
  return bcrypt.compareSync(passwordText, passwordHashed);
}

export function encryptJWT<T extends object>(payload: T) {
  return jwt.sign(payload, process.env.JWT_SECRET!!);
}
export function decryptJWT<T extends object>(jwtToken: string) {
  return jwt.decode(jwtToken) as T;
}
