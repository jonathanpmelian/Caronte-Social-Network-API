const UserModel = require("../models/user.model");

async function getAllFollowing(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "following",
      select: "name surname username photo premium",
    });

    res.status(200).json(user.following);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting following: ${err}`);
  }
}

async function addFollowing(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id);
    const user2 = await UserModel.findById(req.params.userId);
    const index = user.following.findIndex(
      (elem) => elem._id.toString() === req.params.userId
    );
    if (res.locals.user.id !== req.params.userId && index === -1) {
      user.following.push(req.params.userId);
      await user.save();

      user2.followers.push(user.id);
      user2.influence += 1;
      await user2.save();

      const userUpdated = await UserModel.findById(res.locals.user.id).populate(
        {
          path: "following",
          select: "name surname username photo premium",
        }
      );
      res.status(200).json(userUpdated.following);
    } else {
      res
        .status(400)
        .send("You already follow this person or that person is you!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding following: ${err}`);
  }
}

async function deleteOneFollowing(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate("feed");
    const user2 = await UserModel.findById(req.params.userId);
    const index = user.following.findIndex(
      (elem) => elem._id.toString() === req.params.userId
    );
    const index2 = user2.followers.findIndex(
      (elem) => elem._id.toString() === res.locals.user.id
    );

    user.following.splice(index, 1);
    await user.save();
    user2.followers.splice(index2, 1);
    user2.influence -= 1;
    await user2.save();

    for (let i = 0; i < user.feed.length; i++) {
      if (user.feed[i].user._id.toString() === req.params.userId) {
        user.feed.splice(i, 1);
        await user.save();
      }
    }

    res.status(200).send("Unfollow user done correctly");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting following: ${err}`);
  }
}

module.exports = {
  getAllFollowing,
  addFollowing,
  deleteOneFollowing,
};
