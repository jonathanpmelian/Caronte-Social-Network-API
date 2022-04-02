const router = require("express").Router();

const { checkAuth } = require("../utils/index");

const {
  getAllFollowing,
  addFollowing,
  deleteOneFollowing,
} = require("../controllers/following.controller");

router.get("/following", checkAuth, getAllFollowing);
router.post("/following/:userId", checkAuth, addFollowing);
router.delete("/following/:userId", checkAuth, deleteOneFollowing);

module.exports = router;
