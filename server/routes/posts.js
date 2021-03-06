const express = require("express");
const { Post, Comment, Like } = require("../models/post");
const { User } = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");

//Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  posts.reverse();
  res.send(posts);
});

//Get a specific post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.send(post);
});

//get user's posts
router.post("/myPosts", async (req, res) => {
  const posts = await User.findById(req.body.userId).select("posts -_id ");
  posts.reverse();
  res.send(posts);
});

//like a post
router.post("/likePost", async (req, res) => {
  const user = await User.findById(req.body.userId);
  const post = await Post.findById(req.body.postId);
  const userId = post.user._id;

  // send notification to post creater
  await User.updateOne(
    { _id: userId },
    {
      $push: {
        notifications: {
          profilePic: user.profile.profilePic,
          content: user.username + " has liked your post",
          createdAt: new Date().getTime(),
        },
      },
    }
  );

  await User.updateOne(
    {
      $and: [
        {
          _id: post.user._id,
        },
        {
          "posts._id": post._id,
        },
      ],
    },
    {
      $push: {
        "posts.$[].likes": {
          _id: user._id,
        },
      },
    }
  );

  //   push user likes

  await Post.updateOne(
    { _id: post._id },
    {
      $push: {
        likes: {
          _id: user._id,
        },
      },
    }
  );

  // update user's recent posts activity
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        recent: {
          user: {
            _id: post.user._id,
            username: post.user.username,
            profilePic: post.user.profilePic,
          },
          video: post.video,
          image: post.image,
          text: post.text,
          comments: post.comments,
          shares: post.shares,
          likes: post.likes,
          createdAt: post.createdAt,
        },
      },
    }
  );

  res.send("Post liked.");
});

//unlike a post
router.post("/unlikePost", async (req, res) => {
  const user = await User.findById(req.body.userId);
  const post = await Post.findById(req.body.postId);

  // remove my like from post's likes
  await Post.updateOne(
    { _id: post._id },
    {
      $pull: {
        likes: {
          _id: user._id,
        },
      },
    }
  );
  await User.updateOne(
    {
      $and: [
        {
          _id: post.user._id,
        },
        {
          "posts._id": post._id,
        },
      ],
    },
    {
      $pull: {
        "posts.$[].likes": {
          _id: user._id,
        },
      },
    }
  );

  // update user's recent posts activity
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        recent: {
          user: {
            _id: post.user._id,
            username: post.user.username,
            profilePic: post.user.profilePic,
          },
          video: post.video,
          image: post.image,
          text: post.text,
          comments: post.comments,
          shares: post.shares,
          likes: post.likes,
          createdAt: post.createdAt,
        },
      },
    }
  );

  res.send("successfully unliked post");
});

//comments and replies
router.post("/comment", async (req, res) => {
  const post = await Post.findById(req.body.postId);
  const comment = req.body.comment;
  const user = await User.findById(req.body.userId);

  // create new comment
  const newComment = new Comment({
    _id: post.comments.length++,
    user: {
      _id: user._id,
      username: user.username,
      profilePic: user.profile.profilePic,
    },
    comment: comment,
    createdAt: new Date().getTime(),
    replies: [],
  });
  Post.updateOne(
    { _id: post._id },
    {
      $push: {
        comments: newComment,
      },
    },

    // check whether post is mine
    async function (err, data) {
      if (user._id.toString() != post.user._id.toString()) {
        await User.updateOne(
          { _id: post.user._id },
          {
            $push: {
              notifications: {
                content: user.username + " has commented on your post",
                profilePic: user.profile.profilePic,
                createdAt: new Date().getTime(),
              },
            },
          }
        );
      }

      await User.updateOne(
        {
          $and: [
            {
              _id: post.user._id,
            },
            {
              "posts._id": post._id,
            },
          ],
        },
        {
          $push: {
            "posts.$[].comments": newComment,
          },
        }
      );

      // update user's recent posts activity
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            recent: {
              user: {
                _id: post.user._id,
                username: post.user.username,
                profilePic: post.user.profilePic,
              },
              video: post.video,
              image: post.image,
              text: post.text,
              comments: post.comments,
              shares: post.shares,
              likes: post.likes,
              createdAt: post.createdAt,
            },
          },
        }
      );

      newComment;
      res.json(newComment);
    }
  );
});

//reply a comment
router.post("/replyComment", async (req, res) => {
  const reply = req.body.reply;
  const post = await Post.findById(req.body.postId);
  const user = await User.findById(req.body.userId);
  const commentId = req.body.commentId;
  const replyId = new mongoose.Types.ObjectId();

  // post comment on post
  await Post.updateOne(
    {
      $and: [
        {
          _id: post._id,
        },
        {
          "comments._id": commentId,
        },
      ],
    },
    {
      $push: {
        "comments.$.replies": {
          _id: replyId,
          user: {
            _id: user._id,
            username: user.username,
            profilePic: user.profile.profilePic,
          },
          reply: reply,
          createdAt: new Date().getTime(),
        },
      },
    }
  );

  // push reply to user's post
  await User.updateOne(
    {
      $and: [
        { _id: post.user._id },
        { "posts._id": post._id },
        { "posts.comments._id": commentId },
      ],
    },
    {
      $push: {
        "posts.$[].commments.$[],replies": {
          _id: replyId,
          user: {
            _id: user._id,
            username: user.username,
            profilePic: user.profile.profilePic,
          },
          reply: reply,
          createdAt: new Date().getTime(),
        },
      },
    }
  );

  // update user's recent posts activity
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        recent: {
          user: {
            _id: post.user._id,
            username: post.user.username,
            profilePic: post.user.profilePic,
          },
          video: post.video,
          image: post.image,
          text: post.text,
          comments: post.comments,
          shares: post.shares,
          likes: post.likes,
          createdAt: post.createdAt,
        },
      },
    }
  );

  res.json({
    status: "success",
    message: "Successfully replied comment.",
  });
});

//share a post

//Delete a post
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.send("You are not authorized to perform this action");

  const post = user.posts.id(req.params.id);
  if (!post) return res.send("You are not authorized to perform this action");
  post.remove();
  (await user).save();

  await Post.deleteOne({ _id: req.params.id });
  res.json({
    status: "success",
    message: "Successfully deleted post.",
  });
});

//Create a post
router.post("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  // create new post.
  const post = new Post({
    user: {
      _id: user._id,
      username: user.username,
      profilePic: user.profile.profilePic,
    },
    createdAt: new Date().getTime(),
    text: req.body.text,
    image: req.body.image,
    video: req.body.video,
  });

  // update user's recent posts activity
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        recent: {
          user: {
            _id: post.user._id,
            username: post.user.username,
            profilePic: post.user.profilePic,
          },
          video: post.video,
          image: post.image,
          text: post.text,
          comments: post.comments,
          shares: post.shares,
          likes: post.likes,

          createdAt: post.createdAt,
        },
      },
    }
  );

  // update user posts.
  user.posts.push(post);
  post.save();
  user.save();
  res.send(post);
});

module.exports = router;
