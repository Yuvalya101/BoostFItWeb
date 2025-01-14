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
      message: "Login successfull",
      data: token,
    });
  } catch (e: any) {
    res.status(400).json({ error: e, message: e.message, data: null, status: 400 });
  }
}

export async function me(req: Request, res: Response) {
  const { id } = req.user!;
  const user = await UserService.findUserById(id);

  res.status(200).json({
    error: null,
    message: "fetched user details successfully",
    data: user,
  });
}
