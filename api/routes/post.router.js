const router = require("express").Router();
const { checkAuth, checkSubscription } = require("../utils/index");
const commentRouter = require("./comment.router");

const {
  createPost,
  getAllPost,
  getOnePost,
  editOnePost,
  deleteOnePost,
} = require("../controllers/post.controller");

router.use("/:postId/comments", commentRouter);

router.post("/", checkAuth, createPost);
router.get("/", checkAuth, checkSubscription, getAllPost);
router.get("/:postId", checkAuth, checkSubscription, getOnePost);
router.put("/:postId", checkAuth, editOnePost);
router.delete("/:postId", checkAuth, deleteOnePost);

module.exports = router;
