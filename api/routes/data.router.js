const router = require("express").Router();

const { checkAuth } = require("../utils/index");

const { getTopList, getNews } = require("../controllers/data.controller");

router.get("/toplist", checkAuth, getTopList);
router.get("/news", checkAuth, getNews);

module.exports = router;
