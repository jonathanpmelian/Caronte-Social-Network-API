const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  disLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  publisDate: {
    type: Number,
    required: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  lastUpdate: {
    type: Date,
  },
  timeAgo: {
    type: String,
  },
});

module.exports = commentSchema;
