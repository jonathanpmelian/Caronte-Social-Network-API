const router = require("express").Router();

const checkAuth = require("../utils/index");

const { login, signup } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/signup", signup);
router.get("/check", checkAuth, (req, res) => {
  res.send("user valid and logged in");
});

module.exports = router;
