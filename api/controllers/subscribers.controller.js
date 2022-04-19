const UserModel = require("../models/user.model");

async function getSubscribers(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "subscribers",
      select: "username",
    });

    res.status(200).json(user.subscribers);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting subscribers: ${err}`);
  }
}

module.exports = getSubscribers;
