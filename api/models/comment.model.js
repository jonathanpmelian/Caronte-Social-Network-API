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
  publisDate: {
    type: Date,
    default: Date.now(),
  },
  edited: {
    type: Boolean,
  },
  lastUpdate: {
    type: Date,
  },
});

module.exoport = commentSchema;
