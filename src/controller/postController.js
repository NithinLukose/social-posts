import Post from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.getAll();
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
};

//to work on
export const getPost = async (req, res) => {
  const post = await Post.getPostById(parseInt(req.params.id));
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};

export const createPost = async (req, res) => {
  const post = req.body;
  const { id: userId } = req.user;
  const id = await Post.create({ ...post, userId });
  res.status(201).json({
    status: "success",
    data: {
      post: {
        id,
        ...post,
      },
    },
  });
};

export const updatePost = async (req, res) => {
  const updatedPost = req.body;
  const user = req.user;
  const post = await Post.getPostById(parseInt(req.params.id));
  if (post.user_id !== user.id) {
    return res.status(403).json({
      status: "failed",
      message: "user not authorized to update this post",
    });
  }
  const result = await Post.update(parseInt(req.params.id), updatedPost);
  if (result.affectedRows === 0) {
    res.status(204);
  }
  res.status(200).json({
    status: "success",
    data: {
      id: req.params.id,
      post,
    },
  });
};
export const deletePost = async (req, res) => {
  const user = req.user;
  const post = await Post.getPostById(parseInt(req.params.id));
  if (!post || post.user_id !== user.id) {
    return res.status(403).json({
      status: "failed",
      message: "user not authorized to update this post",
    });
  }
  await Post.delete(parseInt(req.params.id));
  res.status(204).json({
    status: "success",
    data: null,
  });
};
