const PortfolioModel = require("../models/portfolio.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

async function getMyProfile(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate(
      "portfolio"
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting my profile: ${err}`);
  }
}

async function getMyPosts(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "posts",
      populate: "user",
    });

    res.status(200).json(user.posts);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting my posts: ${err}`);
  }
}

async function editMyProfile(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(
      res.locals.user.id,
      {
        photo: req.body.photo,
        description: req.body.description,
        online: req.body.online,
      },
      {
        new: true,
        runValidators: true,
        select:
          "name surname username description email country description photo premium influence posts online",
      }
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing my profile: ${err}`);
  }
}

async function deleteMyAccount(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate(
      "posts subscriptions"
    );

    for (let i = 0; i < user.following.length; i++) {
      const userFollowed = await UserModel.findById(
        user.following[i].toString()
      );
      const index = userFollowed.followers.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userFollowed.followers.splice(index, 1);
      userFollowed.influence -= 1;
      await userFollowed.save();
    }

    for (let i = 0; i < user.followers.length; i++) {
      const userFollower = await UserModel.findById(
        user.followers[i].toString()
      );

      const index = userFollower.following.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userFollower.following.splice(index, 1);
      await userFollower.save();
    }

    for (let i = 0; i < user.subscriptions.length; i++) {
      const userSubscribed = await UserModel.findById(
        user.subscriptions[i].user._id.toString()
      ).populate("subscribers");

      const index = userSubscribed.subscribers.findIndex(
        (elem) => elem._id.toString() === user.id
      );
      userSubscribed.subscribers.splice(index, 1);
      await userSubscribed.save();
    }

    for (let i = 0; i < user.posts.length; i++) {
      for (let j = 0; j < user.posts[i].bookedTimes.length; j++) {
        const follower = await UserModel.findById(
          user.posts[i].bookedTimes[j]._id.toString()
        ).populate("bookmarks");
        const index = follower.bookmarks.findIndex(
          (elem) => elem.user._id.toString() === user.id
        );
        follower.bookmarks.splice(index, 1);
        await follower.save();
      }
    }

    for (let i = 0; i < user.followers.length; i++) {
      const follower = await UserModel.findById(
        user.followers[i]._id.toString()
      ).populate("feed");
      const index = follower.feed.findIndex(
        (elem) => elem.user._id.toString() === user.id
      );
      follower.feed.splice(index, 1);
      await follower.save();
    }

    for (let i = 0; i < user.portfolio.length; i++) {
      await PortfolioModel.findByIdAndDelete(user.portfolio[i]);
    }

    for (let i = 0; i < user.posts.length; i++) {
      await PostModel.findByIdAndDelete(user.posts[i]);
    }

    await UserModel.findByIdAndDelete(res.locals.user.id);

    res.status(200).send("Your account have been deleted succesfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deletin my account: ${err}`);
  }
}

module.exports = {
  getMyProfile,
  getMyPosts,
  editMyProfile,
  deleteMyAccount,
};
