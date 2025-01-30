import express from "express";
import * as PostController from "../controllers/posts.controller";
import authMiddlware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPost);
router.get("/user/:id", PostController.getUserPosts);
<<<<<<< HEAD
=======
router.post("/like/:id", authMiddlware, PostController.likePost);
router.post("/unlike/:id", authMiddlware, PostController.unlikePost);
router.post("/comment/:id", authMiddlware, PostController.commentPost);

>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
router.post("/", authMiddlware, PostController.createPost);
router.put("/:id", authMiddlware, PostController.updatePost);
router.delete("/:id", authMiddlware, PostController.deletePost);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
