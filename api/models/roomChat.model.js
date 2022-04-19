const mongoose = require("mongoose");
const messageSchema = require("../models/message.model");

const roomChatSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  messages: [messageSchema],
  newMessages1: {
    type: Number,
    default: 0,
  },
  newMessages2: {
    type: Number,
    default: 0,
  },
});

const RoomChatModel = mongoose.model("roomChat", roomChatSchema);
module.exports = RoomChatModel;
