const router = require("express").Router();

const authRouter = require("./auth.router");
const postRouter = require("./post.router");
const usersRouter = require("./users.router");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/users", usersRouter);

module.exports = router;
