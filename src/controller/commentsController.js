import Comments from "../models/commentsModel.js";

export const addAComment = async (req, res) => {
  const { postId, content, parentId = null } = req.body;
  const user = req.user;
  const result = await Comments.addAComment(postId, user.id, {
    content,
    parentId,
  });
  res.status(201).json({
    status: "success",
    data: {
      comment: {
        id: result.insertId,
        content,
        postId,
        parentId,
      },
    },
  });
};

export const updateComment = async (req, res) => {
  const { postId, content } = req.body;
  const id = parseInt(req.params.id);
  const user = req.user;
  const commentExists = await Comments.getUserComment(postId, user.id, id);
  if (commentExists.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Comment doesn't exist",
    });
  }
  const result = await Comments.updateComment({
    content,
    id,
  });
  if (result.affectedRows === 1) {
    return res.status(200).json({
      message: "Comment updated successfully",
    });
  }
  return res.status(500).json({
    status: "fail",
    message: "Something went wrong",
  });
};

export const replyComment = async (req, res) => {
  const { postId, content } = req.body;
  const id = parseInt(req.params.id);
  const user = req.user;
  const commentExists = await Comments.getComment(postId, id);
  if (commentExists.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Comment doesn't exist",
    });
  }
  const result = await Comments.addAComment(postId, user.id, {
    content,
    parentId: id,
  });
  res.status(201).json({
    status: "success",
    data: {
      comment: {
        id: result.insertId,
        content,
        postId,
        parentId: id,
      },
    },
  });
};

export const deleteComment = async (req, res) => {
  const { postId } = req.body;
  const user = req.user;
  const id = parseInt(req.params.id);
  const commentExists = await Comments.getUserComment(postId, user.id, id);
  if (commentExists.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Comment doesn't exist",
    });
  }
  await Comments.deleteComment(id);
  res.status(204).json({
    status: "success",
    message: "comment deleted successfully",
  });
};
