const router = require("express").Router();
const { checkAuth } = require("../utils/index");
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
router.get("/", checkAuth, getAllPost);
router.get("/:postId", checkAuth, getOnePost);
router.put("/:postId", checkAuth, editOnePost);
router.delete("/:postId", checkAuth, deleteOnePost);

module.exports = router;
