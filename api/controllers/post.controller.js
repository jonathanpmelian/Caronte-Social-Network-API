const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

async function createPost(req, res) {
  try {
    req.body.user = res.locals.user.id;
    req.body.summary = req.body.content.substring(0, 200);

    const post = await PostModel.create(req.body);
    await post.save();

    const creator = await UserModel.findById(res.locals.user.id);
    creator.posts.push(post.id);
    await creator.save();

    for (let i = 0; i < creator.followers.length; i++) {
      const user = await UserModel.findById(creator.followers[i].toString());
      user.feed.push(post.id);
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

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting All Post ${err}`);
  }
}

async function getOnePost(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId, "-summary");

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting One Post ${err}`);
  }
}

async function editOnePost(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (
      req.body.likes !== undefined ||
      req.body.dislikes !== undefined ||
      req.body.bookedTimes !== undefined
    ) {
      const user = await UserModel.findById(
        req.body.likes || req.body.dislikes || req.body.bookmarks
      );
      const key = Object.keys(req.body)[0];
      const index = post[key].findIndex(
        (elem) => elem._id.toString() === user.id
      );

      if (index === -1) {
        post[key].push(user.id);
        await post.save();

        if (key === "bookedTimes") {
          user.bookmarks.push(post.id);
          await user.save();
        }
        res.status(200).json(post);
      } else {
        post[key].splice(index, 1);
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

      for (let i = 0; i < post.bookedTimes; i++) {
        const user = await UserModel.findById(post.bookedTimes[i].toString());
        const index = user.bookmarks.findIndex(
          (elem) => elem._id.toString() === post.id
        );
        user.bookmarks.splice(index, 1);
        await user.save();
      }

      for (let i = 0; i < creator.followers; i++) {
        const user = await UserModel.findById(creator.followers[i].toString());
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
