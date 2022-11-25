const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router
  .route("/post")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

//protect all routes after this middleware
router.use(authController.protect);

router.route("/post/:id").get(postController.getPostById);

router.route("/post/like/:id").get(postController.likePost);
router.route("/post/dislike/:id").get(postController.dislikePost);
router.route("/mypost").get(postController.getMyPosts);

module.exports = router;
