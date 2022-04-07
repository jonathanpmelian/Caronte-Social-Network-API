const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

async function createPost(req, res) {
  try {
    req.body.user = res.locals.user.id;
    req.body.summary = req.body.content.substring(0, 200) + "...";

    if (req.body.premium === true && !res.locals.user.premium) {
      return res.status(403).send("Only premium users can create premium post");
    }

    const post = await PostModel.create(req.body);
    await post.save();

    const creator = await UserModel.findById(res.locals.user.id);
    creator.posts.push(post.id);
    await creator.save();

    for (let i = 0; i < creator.followers.length; i++) {
      const user = await UserModel.findById(
        creator.followers[i].toString()
      ).populate("subscriptions");
      if (!post.premium) {
        user.feed.push(post.id);
      } else {
        if (user.subscriptions.length > 0) {
          user.subscriptions.forEach((elem) => {
            if (elem.type === "Anual") {
              const time = elem.date + 365 * 60 * 60 * 1000;
              if (time < Date.now()) {
                elem.available = false;
              }
            } else if (elem.type === "Monthly") {
              const time = elem.date + 30 * 60 * 60 * 1000;
              if (time < Date.now()) {
                elem.available = false;
              }
            } else {
              const time = elem.date + 7 * 60 * 60 * 1000;
              if (time < Date.now()) {
                elem.available = false;
              }
            }
          });
          for (let i = 0; i < user.subscriptions.length; i++) {
            if (
              user.subscriptions[i].user._id.toString() ===
                post.user._id.toString() &&
              user.subscriptions[i].available
            ) {
              user.feed.push(post.id);
            }
          }
        }
      }

      await user.save();
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error creating post ${err}`);
  }
}

async function getAllPost(req, res) {
  try {
    const post = await PostModel.find(
      {
        category: req.query.category,
        title: { $regex: req.query.input || "", $options: "i" },
      },
      [
        "user",
        "title",
        "summary",
        "category",
        "premium",
        "publishDate",
        "likes",
        "dislikes",
        "comments",
        "bookedTimes",
      ]
    );

    const user = await UserModel.findById(res.locals.user.id).populate(
      "subscriptions"
    );

    for (let i = 0; i < post.length; i++) {
      if (post[i].premium) {
        if (user.subscriptions.length > 0) {
          for (let j = 0; j < user.subscriptions.length; j++) {
            if (
              post[i].user._id.toString() ===
                user.subscriptions[j].user._id.toString() &&
              user.subscriptions[j].available
            ) {
              post.splice(i, 1);
            }
          }
        } else {
          post.splice(i, 1);
        }
      }
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting All Post ${err}`);
  }
}

async function getOnePost(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId, "-summary");
    const user = await UserModel.findById(res.locals.user.id).populate(
      "subscriptions"
    );
    if (post.premium) {
      const index = user.subscriptions.findIndex(
        (elem) => elem.user._id.toString() === post.user._id.toString()
      );

      if (index !== -1 && user.subscriptions[index].available) {
        return res.status(200).json(post);
      } else {
        return res.status(403).send(`You must be subscribed`);
      }
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting One Post ${err}`);
  }
}

async function editOnePost(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId);
    const creator = await UserModel.findById(post.user);

    if (req.body.likes || req.body.dislikes || req.body.bookedTimes) {
      const user = await UserModel.findById(
        req.body.likes || req.body.dislikes || req.body.bookedTimes
      );
      const key = Object.keys(req.body)[0];
      const index = post[key].findIndex(
        (elem) => elem._id.toString() === user.id
      );

      if (index === -1) {
        post[key].push(user.id);
        if (key === "likes") {
          creator.influence += 1;
          if (creator.influence > process.env.premiumLvl) {
            creator.premium = true;
          }
        }
        if (key === "dislikes") {
          creator.influence -= 1;
        }
        await creator.save();
        await post.save();

        if (key === "bookedTimes") {
          user.bookmarks.push(post.id);
          await user.save();
        }
        res.status(200).json(post);
      } else {
        post[key].splice(index, 1);
        if (key === "likes") {
          creator.influence -= 1;
        }
        if (key === "dislikes") {
          creator.influence += 1;
          if (creator.influence > process.env.premiumLvl) {
            creator.premium = true;
          }
        }
        await creator.save();
        await post.save();

        if (key === "bookedTimes") {
          const index = user.bookmarks.findIndex(
            (elem) => elem._id.toString() === post.id
          );
          user.bookmarks.splice(index, 1);
          await user.save();
        }
        res.status(200).json(post);
      }
    } else {
      if (res.locals.user.id === post.user.toString()) {
        req.body.edited = true;
        req.body.lastUpdate = Date.now();

        const post = await PostModel.findByIdAndUpdate(
          req.params.postId,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(200).json(post);
      } else {
        res.status(403).send("You are not authorized to edit this fields");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing One Post ${err}`);
  }
}

async function deleteOnePost(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (
      res.locals.user.id === post.user.toString() ||
      res.locals.user.role === "Admin"
    ) {
      const creator = await UserModel.findById(post.user.toString());
      const indexUserPosts = creator.posts.findIndex(
        (elem) => elem._id.toString() === post.id
      );
      creator.posts.splice(indexUserPosts, 1);
      await creator.save();

      for (let i = 0; i < post.bookedTimes.length; i++) {
        const user = await UserModel.findById(
          post.bookedTimes[i]._id.toString()
        );
        const index = user.bookmarks.findIndex(
          (elem) => elem._id.toString() === post.id
        );
        user.bookmarks.splice(index, 1);
        await user.save();
      }

      for (let i = 0; i < creator.followers.length; i++) {
        const user = await UserModel.findById(
          creator.followers[i]._id.toString()
        );
        const index = user.feed.findIndex(
          (elem) => elem._id.toString() === post.id
        );
        user.feed.splice(index, 1);
        await user.save();
      }
      await PostModel.findByIdAndDelete(req.params.postId);

      res.status(200).send("Post has been deleted");
    } else {
      res.status(403).send("User not Authorized to delete this post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting One Post ${err}`);
  }
}

module.exports = {
  createPost,
  getAllPost,
  getOnePost,
  editOnePost,
  deleteOnePost,
};
