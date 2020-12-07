const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: Object,
  comment: {
    type: String,
    required: true,
  },
  createdAt: Date,
  replies: [],
});

const Comment = mongoose.model("Comment", commentSchema);

const postSchema = mongoose.Schema({
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likes: [],
  comments: [commentSchema],
  shares: [],
  createdAt: {
    type: Date,
  },
  userProfilePic: {
    type: String,
  },
  user: {
    type: mongoose.Schema({
      _id: String,
      username: String,
      profilePic: String,
    }),
  },
  text: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

exports.Post = Post;
exports.postSchema = postSchema;
exports.Comment = Comment;
