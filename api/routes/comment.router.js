const router = require("express").Router({ mergeParams: true });

const { checkAuth, checkAdmin } = require("../utils/index");

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.cotroller");

router.post("/", checkAuth, createComment);
router.put("/:commentId", checkAuth, updateComment);
router.delete("/:commentId", checkAuth, checkAdmin, deleteComment);

module.exports = router;
