import express from "express";
import * as UserController from "../controllers/auth.controller";
import authMiddlware from "../middlewares/auth.middleware";
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       201:
 *         description: user registered successfully
 *       400:
 *         description: invalid input
 */
router.post("/register", UserController.registerUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user
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
/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Sign in or register using Google account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Google sign-in successful
 *       400:
 *         description: Invalid Google token
 */
router.post("/google", UserController.signInUserWithGoogle);
/**
 * @swagger
 * /auth:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       400:
 *         description: Invalid request data
 */
router.put("/", authMiddlware, UserController.updateUser);
/**
 * @swagger
 * /auth:
 *   delete:
 *     summary: Delete the current user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       500:
 *         description: Server error
 */
router.delete("/", authMiddlware, UserController.deleteUser);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: jane@example.com
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.get("/me", authMiddlware, UserController.me);

export default router;
