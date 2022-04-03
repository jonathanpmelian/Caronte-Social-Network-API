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

const {
  getMyProfile,
  editMyProfile,
  deleteMyAccount,
} = require("../controllers/profile.controller");

const {
  getAllPortfolio,
  getOnePortfolio,
  addPortfolio,
  editMyPortfolio,
  deletePortfolio,
} = require("../controllers/portfolio.controller");

router.get("/following", checkAuth, getAllFollowing);
router.post("/following/:userId", checkAuth, addFollowing);
router.delete("/following/:userId", checkAuth, deleteOneFollowing);

router.get("/followers", checkAuth, getAllFollowers);

router.get("/bookmarks", checkAuth, getAllBookmarks);
router.delete("/bookmarks/:postId", checkAuth, deleteOneBookmark);

router.get("/feed", checkAuth, getMyFeed);
router.delete("/feed/:postId", checkAuth, removePostFeed);

router.get("/profile", checkAuth, getMyProfile);
router.put("/profile", checkAuth, editMyProfile);
router.delete("/profile", checkAuth, deleteMyAccount);

// router.get("/portfolio", checkAuth, getAllPortfolio);
// router.get("/portfolio/:portfolioId", checkAuth, getOnePortfolio);
// router.post("/portfolio", checkAuth, addPortfolio);
// router.put("/portfolio/portfolioId", checkAuth, editMyPortfolio);
// router.delete("/portfolio/:portfolioId", checkAuth, deletePortfolio);

module.exports = router;
