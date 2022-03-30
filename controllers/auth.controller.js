const UserModel = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALTROUNDS)
    );
    const user = await UserModel.create(req.body);
    const token = jwt.sign({ email: user.email }, process.env.SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error creating user: ${err}`);
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(500).send("Email or password not valid");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(500).send("Email or password not valid");

      const token = jwt.sign({ email: user.email }, process.env.SECRET);
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error login user: ${err}`);
  }
}

module.exports = {
  login,
  signup,
};
