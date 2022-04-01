const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function checkAuth(req, res, next) {
  try {
    if (!req.headers.token) return res.status(500).send("User not logged in");

    jwt.verify(req.headers.token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(500).send("Token not valid");

      const user = await UserModel.findOne({ email: decoded.email });

      if (!user) return res.status(500).send("Token not valid");
      else {
        res.locals.user = user;
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

async function checkAdmin(req, res, next) {
  try {
    if (res.locals.user.role === "Admin") {
      next();
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

module.exports = { checkAuth, checkAdmin };
