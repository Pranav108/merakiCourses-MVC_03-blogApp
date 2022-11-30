const Post = require("../model/postModel");
const Joi = require("joi");

const postSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .max(200)
    .required()
    .error(
      () =>
        new Error(
          "Contenet should be less then 200 chars and more then 10 chars"
        )
    ),

  created_by: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    })
    .error(() => new Error("Invalid Email")),
}).unknown(false);
exports.getAllPosts = async (req, res) => {
  const data = await Post.query();
  return res.json(data);
};

exports.getPostById = async (req, res) => {
  const post = await Post.query().findById(req.params.id);
  return res.send(
    post || {
      result: "failure",
      message: "Post with given ID doesn't exist",
    }
  );
};

exports.createPost = async (req, res) => {
  const userEmail = req.currentUser.email;
  const post = {
    content: req.body.content,
    created_by: userEmail,
  };
  const { error, value } = postSchema.validate(post);
  if (error)
    return res.status(400).json({ result: "failure", message: error.message });

  const createdPost = await Post.query().insert(post);
  return res.json(createdPost);
};

exports.likePost = async (req, res) => {
  const likedPost = await Post.query()
    .findById(req.params.id)
    .increment("like_count", 1);
  if (likedPost)
    return res.json({
      result: "success",
      message: "Post liked",
    });
  return res.json({
    result: "failure",
    message: "Post not found",
  });
};

exports.dislikePost = async (req, res) => {
  const dislikedPost = await Post.query()
    .findById(req.params.id)
    .increment("dislike_count", 1);
  if (dislikedPost)
    return res.json({
      result: "success",
      message: "Post disliked ",
    });
  return res.json({
    result: "failure",
    message: "Post not found",
  });
};

exports.getMyPosts = async (req, res) => {
  const userEmail = req.currentUser.email;
  const data = await Post.query().where("created_by", "=", userEmail);
  return res.json({
    result: "success",
    length: data.length,
    data,
  });
};
