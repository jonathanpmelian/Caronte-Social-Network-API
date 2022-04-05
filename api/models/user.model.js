const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    message: "{VALUE} is not supported",
    default: "User",
  },
  premium: {
    type: Boolean,
    default: false,
  },
  influence: {
    type: Number,
    default: 0,
  },
  feed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
    },
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  portfolio: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolio",
    },
  ],
  postNotification: {
    type: Boolean,
    default: false,
  },
  commentNotification: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
