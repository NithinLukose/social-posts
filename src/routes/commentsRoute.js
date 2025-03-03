import express from "express";
import {
  addAComment,
  replyComment,
  updateComment,
  deleteComment,
} from "../controller/commentsController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/").post(protect, addAComment);
router
  .route("/:id")
  .patch(protect, updateComment)
  .post(protect, replyComment)
  .delete(protect, deleteComment);

export default router;
