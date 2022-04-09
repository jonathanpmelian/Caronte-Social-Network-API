const router = require("express").Router();

const { checkAuth, checkAdmin } = require("../utils/index");

const {
  getAllUsers,
  getRankingUsers,
  getOneUser,
  editOneUser,
  deleteOneUser,
} = require("../controllers/users.controller");

router.get("/", checkAuth, getAllUsers);
router.get("/ranking", checkAuth, getRankingUsers);
router.get("/:userId", checkAuth, getOneUser);
router.put("/:userId", checkAuth, checkAdmin, editOneUser);
router.delete("/:userId", checkAuth, checkAdmin, deleteOneUser);

module.exports = router;
