import express from "express";
import {
  getAllLikesOfPost,
  likeAPost,
  unLikeAPost,
} from "../controller/likesController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllLikesOfPost)
  .post(protect, likeAPost)
  .delete(protect, unLikeAPost);
export default router;
