const express = require("express");
const { Post } = require("../models/post");
const { User } = require("../models/user");
const router = express.Router();

// search for a user
router.post("/users", async (req, res) => {
  const query = req.body.query;

  const users = await User.find({
    username: {
      $regex: query,
      $options: "i",
    },
  }).select("-password -notifications -email ");
  try {
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

// search for a post
router.post("/post", async (req, res) => {
  const query = req.body.query;

  const posts = await Post.find({
    title: {
      $regex: ".*" + query + ".*",
      $options: "i",
    },
  });

  res.send(posts);
});

module.exports = router;
