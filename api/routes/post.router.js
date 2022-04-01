const router = require("express").Router();

const checkAuth = require("../utils/index");
const commentRouter = require("./comment.router");

const createPost = require("../controllers/post.controller");

router.use("/:postId/comments", commentRouter);
router.post("/", checkAuth, createPost);

module.exports = router;
