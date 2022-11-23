const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

//protect all routes after this middleware
router.use(authController.protect);

router
  .route("/posts")
  .get(postController.getAllPosts)
  .post(postController.addPost);

router
  .route("/posts/:id")
  .get(postController.getPostById)
  .update(postController.updatePost)
  .delete(postController.deletePost);

// no need of these one, I guess
router.route("/like").get(postController.getAllLikedPost);
router.route("/dislike").get(postController.getAllDislikedPost);
