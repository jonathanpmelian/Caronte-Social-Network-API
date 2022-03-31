const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

async function createPost(req, res) {
  try {
    req.body.user = res.locals.user.id;
    const post = await PostModel.create(req.body);
    await post.save();

    const user = await UserModel.findById(res.locals.user.id);
    user.posts.push(post.id);
    await user.save();

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error creating post ${err}`);
  }
}

module.exports = createPost;
