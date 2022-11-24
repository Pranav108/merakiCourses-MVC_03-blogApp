// const express = require("express");
// const postController = require("../controller/postController");
// const authController = require("../controller/authController");
// const userController = require("../controller/userController");
// const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

// //protect all routes after this middleware
// router.use(authController.protect);

// router
//   .route("/post")
//   .get(postController.getAllPosts)
//   .post(postController.createPost);

// router.route("/post/:id").get(postController.getPostById);

// router.route("/post/like/:id").get(postController.likePostById);
// router.route("/post/dislike/:id").get(postController.dislikePostById);

// router.route("/mypost").get(postController.getMyPosts);

const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

router
  .route("/post")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route("/post/:id").get(postController.getPostById);

module.exports = router;
