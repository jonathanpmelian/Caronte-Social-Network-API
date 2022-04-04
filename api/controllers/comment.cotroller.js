const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

async function createComment(req, res) {
  try {
    req.body.user = res.locals.user.id;
    const post = await PostModel.findById(req.params.postId);
    post.comments.push(req.body);
    await post.save();

    res.status(200).json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error creating comment: ${err}`);
  }
}

async function updateComment(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (req.body.likes || req.body.dislike) {
      const user = await UserModel.findById(
        req.body.likes || req.body.dislikes
      );
      const key = Object.keys(req.body)[0];
      const indexComment = post.comments.findIndex(
        (elem) => elem.id === req.params.commentId
      );
      const creator = await UserModel.findById(
        post.comments[indexComment].user._id.toString()
      );
      const index = post.comments[indexComment][key].findIndex(
        (elem) => user.id === elem._id.toString()
      );
      if (index === -1) {
        post.comments[indexComment][key].push(user.id);
        if (key === "likes") {
          creator.influence++;
        }
        if (key === "dislikes") {
          creator.influence--;
        }
        await post.save();
      } else {
        post.comments[indexComment][key].splice(index, 1);
        if (key === "likes") {
          creator.influence--;
        }
        if (key === "dislikes") {
          creator.influence++;
        }
      }
      await creator.save();
      await post.save();

      return res.status(200).json(post.comments);
    }
    if (res.locals.user.id === post.user.toString()) {
      req.body.edited = true;
      req.body.lastUpdate = Date.now();
      const comment = post.comments.id(req.params.commentId);
      comment.set(req.body);
      await post.save();

      res.status(200).json(post.comments);
    } else {
      res.status(403).send("User No Authorized");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating comment: ${err}`);
  }
}

async function deleteComment(req, res) {
  try {
    const post = await PostModel.findById(req.params.postId);
    post.comments.remove(req.params.commentId);
    await post.save();

    res.status(200).send("Comment Deleted");
  } catch (err) {
    res.status(500).send(`Request Error: ${err}`);
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
