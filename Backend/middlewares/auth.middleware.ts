import { RequestHandler } from "express";
import { decryptJWT } from "../utils";

const authMiddlware: RequestHandler = (req, res, next) => {
  try {
    const tokenHeader = (req.headers["authorization"] || req.headers["Authorization"]) as string;

    if (!tokenHeader) {
      throw new Error("Token was not provided in request headers");
    }
    
    const token = tokenHeader.substring("Bearer ".length);
    if (!token) {
      throw new Error("Token was not provided in correct format in request headers");
    }
    const decoded = decryptJWT<{ id: string, email: string }>(token);
    req.user = decoded;
    next();
  } catch (e: any) {
    res.status(401).json({
      message: e.message,
      error: e,
      data: null,
    });
  }
};

export default authMiddlware;
