const router = require("express").Router();

const checkAuth = require("../utils/index");

const createPost = require("../controllers/post.controller");

router.post("/", checkAuth, createPost);

module.exports = router;
