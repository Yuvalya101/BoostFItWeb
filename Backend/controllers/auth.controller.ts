import { Response, Request } from "express";
import {
  UserLoginValidationScheme,
  UserRegistrationValidationScheme,
} from "../validation/user.validation";
import { encryptJWT } from "../utils";
import * as UserService from "../services/user.service";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

export async function signInUserWithGoogle(req: Request, res: Response) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload!;
    const existing = await UserService.findUserByEmail(email!);

    let tokenJWT = encryptJWT({ id: existing?._id.toString(), email, name });
    if (existing) {
      res.json({ message: "User authenticated", status: 200, data: tokenJWT });
      return;
    }
    const user = await UserService.createUser({
      email: email!,
      name: name ?? "Anonymous",
      password: sub,
      image: "",
    });
    tokenJWT = encryptJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });
    // You can create or find the user in your database here
    res.json({ message: "User authenticated", status: 200, data: tokenJWT });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const userData: any = req.body!;

    const validated = UserRegistrationValidationScheme.parse(userData);
    const existingUser = await UserService.findUserByEmail(validated.email);
    if (existingUser) {
      throw new Error("User with email already exists");
    }

    const user = await UserService.createUser(validated);
    res.status(201).json({
      error: null,
      message: "User registration successfull",
      data: user,
      status: 201,
    });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: e, message: e.message, data: null, status: 400 });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const loginData = req.body;

    const validated = UserLoginValidationScheme.parse(loginData);
    const existingUser = await UserService.findUserByEmail(validated.email);
    if (!existingUser || !existingUser.comparePassword(validated.password)) {
      throw new Error("Email or password incorrect");
    }

    const jwtData = {
      id: existingUser._id,
      email: existingUser.email,
    };
    const token = encryptJWT(jwtData);

    res.status(200).json({
      error: null,
      status: 200,
      message: "Login successfull",
      data: token,
    });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: e, message: e.message, data: null, status: 400 });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const { id } = req.user!;

    const user = await UserService.findUserById(id);

    res.status(200).json({
      error: null,
      status: 200,
      message: "fetched user details successfully",
      data: user,
    });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: e, message: e.message, data: null, status: 500 });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const data = req.body;
    const user = await UserService.updateUser(userId, data);
    res.status(200).json({
      error: null,
      message: "updated user details successfully",
      data: user,
    });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: e, message: e.message, data: null, status: 400 });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const user = await UserService.deleteUser(userId);
    res.status(200).json({
      error: null,
      message: "updated deleted successfully",
      data: user,
    });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: e, message: e.message, data: null, status: 400 });
  }
}
