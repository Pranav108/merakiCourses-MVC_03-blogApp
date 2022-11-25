const Post = require("../model/postModel");

exports.getAllPosts = async (req, res) => {
  const data = await Post.all();
  return res.json(data);
};

exports.getPostById = async (req, res) => {
  const post = await Post.get(req.params.id);
  return res.send(
    post || {
      result: "failure",
      message: "Post with given ID doesn't exist",
    }
  );
};

exports.createPost = async (req, res) => {
  const userEmail = req.currentUser[0].email;
  const createdPost = await Post.create({
    content: req.body.content,
    created_by: userEmail,
  });

  return res.json(createdPost);
};

exports.likePost = async (req, res) => {
  await Post.like(req.params.id);
  return res.json({
    result: "success",
    message: "Post liked",
  });
};

exports.dislikePost = async (req, res) => {
  await Post.dislike(req.params.id);
  return res.json({
    result: "success",
    message: "Post disliked",
  });
};

exports.getMyPosts = async (req, res) => {
  const userEmail = req.currentUser[0].email;
  const data = await Post.myPosts(userEmail);
  return res.json({
    result: "success",
    length: data.length,
    data,
  });
};
