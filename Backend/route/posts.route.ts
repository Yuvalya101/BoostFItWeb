import express from "express";
import * as PostController from "../controllers/posts.controller";
import authMiddlware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPost);
router.get("/user/:id", PostController.getUserPosts);
router.post("/like/:id", authMiddlware, PostController.likePost);
router.post("/unlike/:id", authMiddlware, PostController.unlikePost);
router.post("/comment/:id", authMiddlware, PostController.commentPost);

router.post("/", authMiddlware, PostController.createPost);
router.put("/:id", authMiddlware, PostController.updatePost);
router.delete("/:id", authMiddlware, PostController.deletePost);

export default router;
