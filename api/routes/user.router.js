const router = require("express").Router();

const { checkAuth } = require("../utils/index");

const {
  getAllFollowing,
  addFollowing,
  deleteOneFollowing,
} = require("../controllers/following.controller");

const { getAllFollowers } = require("../controllers/followers.controller");

const {
  getAllBookmarks,
  deleteOneBookmark,
} = require("../controllers/bookmarks.controller");

const { getMyFeed, removePostFeed } = require("../controllers/feed.controller");

router.get("/following", checkAuth, getAllFollowing);
router.post("/following/:userId", checkAuth, addFollowing);
router.delete("/following/:userId", checkAuth, deleteOneFollowing);

router.get("/followers", checkAuth, getAllFollowers);

router.get("/bookmarks", checkAuth, getAllBookmarks);
router.delete("/bookmarks/:postId", checkAuth, deleteOneBookmark);

router.get("/feed", checkAuth, getMyFeed);
router.delete("/feed/:postId", checkAuth, removePostFeed);

module.exports = router;
