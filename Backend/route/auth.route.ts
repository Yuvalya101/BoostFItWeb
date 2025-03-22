import express from "express";
import * as UserController from "../controllers/auth.controller";
import authMiddlware from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register", UserController.registerUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: התחברות משתמש
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: login succeed
 *       401:
 *         description: incorrect login
 */
router.post("/login", UserController.loginUser);
router.post("/google", UserController.signInUserWithGoogle);
router.put("/", authMiddlware, UserController.updateUser);
router.delete("/", authMiddlware, UserController.deleteUser);
router.get("/me", authMiddlware, UserController.me);

export default router;
