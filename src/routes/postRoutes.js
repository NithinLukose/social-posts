import express from "express";
import * as postController from "../controller/postController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);
router
  .route("/:id")
  .get(protect, postController.getPost) //single post
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

export default router;
