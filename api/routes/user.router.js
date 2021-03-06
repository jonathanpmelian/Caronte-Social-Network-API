const router = require("express").Router();

const { checkAuth, updatePrice } = require("../utils/index");

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
  getMyPosts,
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

const {
  getAllSubscriptions,
  addSubscription,
} = require("../controllers/subscriptions.controller");

const getSubscribers = require("../controllers/subscribers.controller");

const {
  getPrivacy,
  editPrivacy,
} = require("../controllers/privacy.controller");

const {
  getChats,
  getOneChat,
  addRoom,
  addMessage,
  editRoom,
} = require("../controllers/message.controller");

const coinRouter = require("./coin.router");
const chartRouter = require("./chart.router");

router.use("/portfolio/:portfolioId/coin", coinRouter);
router.use("/portfolio/:portfolioId/chart", chartRouter);

router.get("/following", checkAuth, getAllFollowing);
router.post("/following/:userId", checkAuth, addFollowing);
router.delete("/following/:userId", checkAuth, deleteOneFollowing);

router.get("/followers", checkAuth, getAllFollowers);

router.get("/bookmarks", checkAuth, getAllBookmarks);
router.delete("/bookmarks/:postId", checkAuth, deleteOneBookmark);

router.get("/feed", checkAuth, getMyFeed);
router.delete("/feed/:postId", checkAuth, removePostFeed);

router.get("/profile", checkAuth, getMyProfile);
router.get("/profile/mypost", checkAuth, getMyPosts);
router.put("/profile", checkAuth, editMyProfile);
router.delete("/profile", checkAuth, deleteMyAccount);

router.get("/portfolio", checkAuth, getAllPortfolio);
router.get("/portfolio/:portfolioId", checkAuth, getOnePortfolio, updatePrice);
router.post("/portfolio", checkAuth, addPortfolio);
router.put("/portfolio/:portfolioId", checkAuth, editMyPortfolio);
router.delete("/portfolio/:portfolioId", checkAuth, deletePortfolio);

router.post("/subscriptions/:userId", checkAuth, addSubscription);
router.get("/subscriptions", checkAuth, getAllSubscriptions);

router.get("/subscribers", checkAuth, getSubscribers);

router.get("/privacy", checkAuth, getPrivacy);
router.put("/privacy", checkAuth, editPrivacy);

router.get("/chatroom", checkAuth, getChats);
router.get("/chatroom/:chatroomId", checkAuth, getOneChat);
router.post("/chatroom", checkAuth, addRoom);
router.post("/chatroom/:chatroomId", checkAuth, addMessage);
router.put("/chatroom/:chatroomId", checkAuth, editRoom);

module.exports = router;
