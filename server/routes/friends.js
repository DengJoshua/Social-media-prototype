const express = require("express");
const moment = require("moment");
const router = express.Router();
const { User } = require("../models/user");
const { io } = require("../index");
const mongoose = require("mongoose");

const users = [];
let socketID = "";

// connect socket io
io.on("connection", (socket) => {
  socketID = socket.id;

  socket.on("disconnect", () => {});
});

// get user friends
router.get("/:id", async (req, res) => {
  const friends = await User.findById(req.params.id).select("friends");
  res.send(friends);
});

// get user chats and messages
router.post("/getmessages/:id", async (req, res) => {
  const userId = req.body.userId;
  const me = await User.findById(req.params.id);

  const index = me.friends.findIndex(function (friend) {
    return friend._id == userId;
  });

  const inbox = me.friends[index].inbox;
  res.send(inbox);
});

// send a message to a friend
router.post("/sendMessage", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const friend = await User.findById(req.body.friendId);
  const message = req.body.message;

  await User.updateOne(
    { $and: [{ _id: me._id }, { "friends._id": friend._id }] },
    {
      $push: {
        "friends.$.inbox": {
          friend: friend.username,
          message: message,
          time: moment().format("h:mm a"),
          from: me._id,
        },
      },
    }
  );

  await User.updateOne(
    { $and: [{ _id: friend._id }, { "friends._id": me._id }] },
    {
      $push: {
        "friends.$.inbox": {
          friend: friend.username,
          message: message,
          time: moment().format("h:mm a"),
          from: me._id,
        },
      },
    }
  );

  // send message in real time using socket io
  io.to(users[friend._id]).emit("message", {
    _id: mongoose.Types.ObjectId(),
    message: message,
    time: moment().format("h:mm a"),
    from: me._id,
  });

  res.send("Message sent.");
});

// connect active users
router.post("/connectSocket", async (req, res) => {
  const user = await User.findById(req.body.userId);

  users[user._id] = socketID;
  res.json({
    status: "success",
    message: "Socket connected.",
  });
});

// send a friend request to a user
router.post("/sendFriendRequest", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const user = await User.findById(req.body.reqId);

  // update user friends

  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        friendRequests: {
          _id: me._id,
          username: me.username,
          profilePic: me.profile.profilePic,
          status: "pending",
          sentByMe: false,
          inbox: [],
        },
      },
    }
  );

  // send notification about friend request
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        notifications: {
          content: me.username + " has sent you a friend request.",
          createdAt: new Date().getTime(),
          profilePic: me.profile.profilePic,
        },
      },
    }
  );

  // update user friends
  await User.updateOne(
    { _id: me._id },
    {
      $push: {
        friends: {
          _id: user._id,
          username: user.username,
          profilePic: user.profile.profilePic,
          status: "pending",
          sentByMe: true,
          inbox: [],
        },
      },
    }
  );

  const friend = {
    friends: {
      _id: user._id,
      username: user.username,
      profilePic: user.profile.profilePic,
      status: "pending",
      sentByMe: true,
      inbox: [],
    },
  };

  res.send(friend);
});

//accept a friend request
router.post("/acceptFriendRequest", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const user = await User.findById(req.body.reqId);

  // send notification to user
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        notifications: {
          content: me.username + " has accepted your friend request.",
          createdAt: new Date().getTime(),
          profilePic: me.profile.profilePic,
        },
      },
    }
  );

  // remove user from friend requests
  await User.updateOne(
    { _id: me._id },
    {
      $pull: {
        friendRequests: {
          _id: user._id,
        },
      },
    }
  );

  // update my friends
  await User.updateOne(
    { _id: me._id },
    {
      $push: {
        friends: {
          _id: user._id,
          username: user.username,
          profilePic: user.profile.profilePic,
          status: "accepted",
          sentByMe: false,
          inbox: [],
        },
      },
    }
  );

  // update friend's status from pending to accepted
  await User.updateOne(
    { $and: [{ _id: user._id }, { "friends._id": me._id }] },
    {
      $set: {
        "friends.$.status": "accepted",
      },
    }
  );

  res.json({
    status: "succes",
    message: "You are friends",
  });
});

//decline a friend request
router.post("/decline", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const user = await User.findById(req.body.reqId);

  // send notification about decliend friend request
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        notifications: {
          content: me.username + " has declined your friend request.",
          createdAt: new Date().getTime(),
          profilePic: me.profile.profilePic,
        },
      },
    }
  );

  // remove friend request from user
  await User.updateOne(
    { _id: me._id },
    {
      $pull: {
        friendRequests: {
          _id: user._id,
        },
      },
    }
  );

  // remove user from my friends
  await User.updateOne(
    { _id: user._id },
    {
      $pull: {
        friends: {
          _id: me._id,
        },
      },
    }
  );
  res.json({
    status: "success",
    message: "Friend Request declined.",
  });
});

//cancel sent friend request
router.post("/cancel", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const user = await User.findById(req.body.reqId);

  // remove friend request
  await User.updateOne(
    { _id: user._id },
    {
      $pull: {
        friendRequests: {
          _id: me._id,
        },
      },
    }
  );

  // remove user from my friends
  await User.updateOne(
    { _id: me._id },
    {
      $pull: {
        friends: {
          _id: user._id,
        },
      },
    }
  );
  res.json({
    status: "success",
    message: "Friend Request cancelled.",
  });
});

//delete and unfriend friends
router.post("/unfriend", async (req, res) => {
  const me = await User.findById(req.body.myId);
  const user = await User.findById(req.body.reqId);

  // send notification about unfriending
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        notifications: {
          content: me.username + " unfriended you.",
          createdAt: new Date().getTime(),
          profilePic: me.profile.profilePic,
        },
      },
    }
  );

  // remove me from user friends
  await User.updateOne(
    { _id: user._id },
    {
      $pull: {
        friends: {
          _id: me._id,
        },
      },
    }
  );

  // remove friend from my friends
  await User.updateOne(
    { _id: me._id },
    {
      $pull: {
        friends: {
          _id: user._id,
        },
      },
    }
  );

  res.json({
    status: "success",
    message: "User has been unfriended.",
  });
});

module.exports = router;
