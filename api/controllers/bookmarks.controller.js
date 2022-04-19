const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");

async function getAllBookmarks(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "bookmarks",
      populate: "user",
    });

    res.status(200).json(user.bookmarks);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting all bookmarks: ${err}`);
  }
}

async function deleteOneBookmark(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate(
      "bookmarks"
    );
    const post = await PostModel.findById(req.params.postId).populate(
      "bookedTimes"
    );
    const indexPost = post.bookedTimes.findIndex(
      (elem) => elem._id.toString() === res.locals.user.id
    );
    post.bookedTimes.splice(indexPost, 1);
    await post.save();

    const index = user.bookmarks.findIndex(
      (elem) => elem._id.toString() === req.params.postId
    );
    user.bookmarks.splice(index, 1);
    await user.save();

    res.status(200).json(user.bookmarks);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting bookmark: ${err}`);
  }
}

module.exports = {
  getAllBookmarks,
  deleteOneBookmark,
};
