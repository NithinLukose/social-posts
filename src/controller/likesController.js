import Likes from "../models/likesModel.js";

export const getAllLikesOfPost = async (req, res) => {
  const { postId } = req.query;
  const result = await Likes.getAllLikesOfPost(parseInt(postId));
  console.log(result);
  res.status(200).json({
    message: "sss",
  });
};

export const likeAPost = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;
  const result = await Likes.likeAPost(parseInt(postId), parseInt(user.id));
  if (result.affectedRows === 1) {
    return res.status(201).json({
      status: "success",
      message: "liked",
    });
  }
  res.status(500).json({
    status: "fail",
    message: "Something went wrong",
  });
};

export const unLikeAPost = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;
  const result = await Likes.unLikeAPost(parseInt(postId), parseInt(user.id));
  if (result.affectedRows === 1) {
    return res.status(204).json({
      status: "success",
      message: "unLiked",
    });
  }
  res.status(500).json({
    status: "fail",
    message: "Something went wrong",
  });
};
