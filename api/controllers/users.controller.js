const UserModel = require("../models/user.model");

async function getAllUsers(req, res) {
  try {
    if (res.locals.user.role === "Admin") {
      const users = await UserModel.find(
        { name: { $regex: req.query.input || "", $options: "i" } },
        ["name", "surname", "username", "photo", "role"]
      );

      return res.status(200).json(users);
    }

    const users = await UserModel.find(
      { name: { $regex: req.query.input || "", $options: "i" } },
      ["name", "surname", "username", "photo"]
    );

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error showing all users: ${err}`);
  }
}

async function getOneUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.userId, [
      "name",
      "surname",
      "username",
      "country",
      "description",
      "photo",
      "posts",
      "following",
      "followers",
      "subscribers",
    ]);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error showing one user: ${err}`);
  }
}

async function editOneUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { role: req.body.role, premium: req.body.premium },
      {
        new: true,
        runValidators: true,
        select: "role username name surname premium",
      }
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing one user: ${err}`);
  }
}

async function deleteOneUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.userId);

    for (let i = 0; i < user.following.length; i++) {
      const userFollowed = await UserModel.findById(
        user.following[i].toString()
      );
      const index = userFollowed.followers.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userFollowed.followers.splice(index, 1);
      await userFollowed.save();
    }

    for (let i = 0; i < user.followers.length; i++) {
      const userFollower = await UserModel.findById(
        user.followers[i].toString()
      );
      userFollower.influence -= 1;
      const index = userFollower.following.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userFollower.following.splice(index, 1);
      await userFollower.save();
    }

    for (let i = 0; i < user.subscriptions.length; i++) {
      const userSubscribed = await UserModel.findById(
        user.subscriptions[i].toString()
      );
      const index = userSubscribed.subscribers.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userSubscribed.subscribers.splice(index, 1);
      await userSubscribed.save();
    }

    await UserModel.findByIdAndDelete(req.params.userId);

    res.status(200).send("User Account deleted correctly");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting one user: ${err}`);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  editOneUser,
  deleteOneUser,
};
