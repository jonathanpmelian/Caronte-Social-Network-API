const UserModel = require("../models/user.model");

async function getPrivacy(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id);

    res.status(200).json({
      postNotification: user.postNotification,
      commentNotification: user.commentNotification,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting privacy: ${err}`);
  }
}

async function editPrivacy(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(
      res.locals.user.id,
      {
        postNotification: req.body.postNotification,
        commentNotification: req.body.commentNotification,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      postNotification: user.postNotification,
      commentNotification: user.commentNotification,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing privacy: ${err}`);
  }
}

module.exports = {
  getPrivacy,
  editPrivacy,
};
