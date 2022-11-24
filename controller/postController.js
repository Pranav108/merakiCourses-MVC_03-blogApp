const Post = require("../model/postModel");

async function getAllPosts(req, res) {
  const data = await Post.all();
  return res.json(data);
}

async function getPostById(req, res) {
  const post = await Post.get(req.params.id);
  return res.send(post);
}

async function createPost(req, res) {
  // validation JOI
  const createdPost = await Post.create({ ...req.body });
  return res.json(createdPost);
}

// likepost
// dislikepost
// getAllMyPost

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};
