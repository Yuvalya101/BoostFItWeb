import { Response, Request } from "express";
import {
  UserLoginValidationScheme,
  UserRegistrationValidationScheme,
} from "../validation/user.validation";
import { encryptJWT } from "../utils";
import * as UserService from "../services/user.service";

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
    res.status(400).json({ error: e, message: e.message, data: null, status: 400 });
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
    res.status(400).json({ error: e, message: e.message, data: null, status: 400 });
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
    res.status(500).json({ error: e, message: e.message, data: null, status: 500 });
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
    res.status(400).json({ error: e, message: e.message, data: null, status: 400 });
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
    res.status(400).json({ error: e, message: e.message, data: null, status: 400 });
  }
}
