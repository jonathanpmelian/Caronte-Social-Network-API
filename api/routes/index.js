const router = require("express").Router();

const authRouter = require("./auth.router");
const postRouter = require("./post.router");
const usersRouter = require("./users.router");
const userRouter = require("./user.router");
const dataRouter = require("./data.router");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/users", usersRouter);
router.use("/user", userRouter);
router.use("/data", dataRouter);

module.exports = router;
