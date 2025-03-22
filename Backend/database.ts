import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect(testEnv: boolean) {
  if (testEnv) {
    const conn = await mongoose.connect(process.env.MONGO_URI_TEST!!);
    return conn;
  }
  const conn = await mongoose.connect(process.env.MONGO_URI!!);
  return conn;
}
