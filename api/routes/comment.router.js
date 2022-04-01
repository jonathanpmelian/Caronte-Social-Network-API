const router = require("express").Router({ mergeParams: true });

const checkAuth = require("../utils/index");

const {
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/comment.cotroller");

router.post("/", checkAuth, createComment);
router.put("/:commentId", checkAuth, updateComment);
router.delete("/:commentId", checkAuth, deleteComment);



module.exports = router;