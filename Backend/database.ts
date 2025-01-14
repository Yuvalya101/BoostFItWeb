import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect(testEnv: boolean) {
  if (testEnv) return await mongoose.connect(process.env.MONGO_URI_TEST!!);
  return await mongoose.connect(process.env.MONGO_URI!!);
}
