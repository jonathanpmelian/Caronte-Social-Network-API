const RoomChatModel = require("../models/roomChat.model");
const UserModel = require("../models/user.model");

async function getChats(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate({
      path: "roomChat",
      populate: [
        { path: "user1 user2" },
        { path: "messages", populate: "user" },
      ],
    });

    res.status(200).json(user.roomChat);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting chats: ${err}`);
  }
}

async function getOneChat(req, res) {
  try {
    const room = await RoomChatModel.findById(req.params.chatroomId)
      .populate("user1")
      .populate("user2")
      .populate({
        path: "messages",
        populate: { path: "user", select: "name surname username" },
      });

    res.status(200).json(room);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting one chat: ${err}`);
  }
}

async function addRoom(req, res) {
  try {
    const user1 = await UserModel.findById(res.locals.user.id).populate({
      path: "roomChat",
      populate: "user1 user2",
    });
    const user2 = await UserModel.findById(req.body.user2);

    const roomOpen = user1.roomChat.findIndex(
      (elem) =>
        (elem.user1._id.toString() === user1._id.toString() ||
          elem.user2._id.toString() === user1._id.toString()) &&
        (elem.user1._id.toString() === user2._id.toString() ||
          elem.user2._id.toString() === user2._id.toString())
    );

    if (roomOpen === -1) {
      const room = await RoomChatModel.create({
        user1: res.locals.user.id,
        user2: req.body.user2,
      });

      user2.roomChat.unshift(room);
      user1.roomChat.unshift(room);
      await user1.save();
      await user2.save();

      return res.status(200).json(room);
    }
    res.status(200).json(user1.roomChat[roomOpen]);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding chat: ${err}`);
  }
}

async function addMessage(req, res) {
  try {
    let calcDate = new Date();
    calcDate = calcDate.getTime();

    const room = await RoomChatModel.findById(req.params.chatroomId).populate(
      "user1 user2"
    );
    room.messages.push({
      message: req.body.message,
      user: res.locals.user.id,
      date: calcDate,
    });

    if (res.locals.user.id === room.user1._id.toString()) {
      room.newMessages2++;
    } else {
      room.newMessages1++;
    }

    await room.save();
    const newRoom = await RoomChatModel.findById(
      req.params.chatroomId
    ).populate({
      path: "messages",
      populate: { path: "user", select: "name surname" },
    });

    res.status(200).json(newRoom.messages[newRoom.messages.length - 1]);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding message: ${err}`);
  }
}

async function editRoom(req, res) {
  try {
    const room = await RoomChatModel.findById(req.params.chatroomId).populate(
      "user1 user2"
    );

    if (res.locals.user.id === room.user1._id.toString()) {
      room.newMessages1 = 0;
    } else {
      room.newMessages2 = 0;
    }

    await room.save();

    res.status(200).json(room);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing message: ${err}`);
  }
}

module.exports = {
  getChats,
  getOneChat,
  addRoom,
  addMessage,
  editRoom,
};
