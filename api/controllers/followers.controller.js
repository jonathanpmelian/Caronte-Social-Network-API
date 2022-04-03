const UserModel = require("../models/user.model");

async function getAllFollowers(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "followers",
      select: "name surname username photo premium",
    });

    res.status(200).json(user.followers);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting all followers: ${err}`);
  }
}

module.exports = { getAllFollowers };
