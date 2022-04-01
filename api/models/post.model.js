const mongoose = require("mongoose");
const commentSchema = require("../models/comment.model");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: ["Tecnical"],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  edited: {
    type: Boolean,
  },
  lastUpdate: {
    type: Date,
  },
  bookedTimes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  premium: {
    type: Boolean,
  },
  comments: [
    commentSchema
  ]

});

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
