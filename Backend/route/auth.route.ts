import express from "express";
import * as UserController from "../controllers/auth.controller";
import authMiddlware from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/", authMiddlware, UserController.updateUser);
router.delete("/", authMiddlware, UserController.deleteUser);
router.get("/me", authMiddlware, UserController.me);

export default router