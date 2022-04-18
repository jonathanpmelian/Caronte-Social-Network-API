const UserModel = require("../models/user.model");
// const timeSince = require("../utils/timeCalc");
const moment = require("moment");

async function getMyFeed(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "feed",
      select: "-content",
      options: {
        sort: { publishDate: req.query.sort },
      },
      populate: {
        path: "user",
        select: "username photo name surname",
      },
    });
    user.feed.forEach(
      (elem) => (elem.timeAgo = moment(elem.publishDate).fromNow())
    );
    await user.save();
    console.log(user.feed.length);
    res.status(200).json(user.feed);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting my feed: ${err}`);
  }
}

async function removePostFeed(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate("feed");
    const index = user.feed.findIndex(
      (elem) => elem._id.toString() === req.params.postId
    );
    user.feed.splice(index, 1);
    await user.save();

    res.status(200).json(user.feed);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting feed post: ${err}`);
  }
}

module.exports = {
  getMyFeed,
  removePostFeed,
};
