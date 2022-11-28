const Post = require("../model/postModel");
const Joi = require("joi");

// Add JOI
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
  const userEmail = req.currentUser.email;
  const post = {
    content: req.body.content,
    created_by: userEmail,
  };
  const { error, value } = postSchema.validate(post);
  if (error)
    return res.status(400).json({ result: "failure", message: error.message });

  const [id] = await Post.create(post);
  return res.json({ id, ...post });
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
  const userEmail = req.currentUser.email;
  const data = await Post.myPosts(userEmail);
  return res.json({
    result: "success",
    length: data.length,
    data,
  });
};
