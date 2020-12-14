import React, { Component } from "react";
import PropTypes from "prop-types";

import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";

import Profile from "./User/Profile";
import Search from "./Search";
import Chat from "../Chat/Chat";
import FriendRequests from "./User/FriendRequests";
import Friends from "./User/Friends";
import NewsFeed from "./Posts/NewsFeed";
import SpecPost from "./Posts/specPost";

import { storage } from "../../firebase";
import { Loader } from "rsuite";

import { connect } from "react-redux";
import {
  makePost,
  likePost,
  unlikePost,
  postComment,
} from "../../actions/postActions";
import {
  searchUsers,
  sendFriendRequest,
  unFriend,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
} from "../../actions/userActions";

class RightBody extends Component {
  state = {
    vidUrl: "",
    text: "",
    file: "",
    imgUrl: "",
    uploading: false,
    posts: [],
    user: "",
    username: "",
    profilePic: "",
    story: "",
    gender: "",
    isLoading: true,
  };

  async componentDidMount() {
    const { user } = this.props;

    this.setState({ username: user.username });
    this.setState({ story: user.profile.story });
    this.setState({ gender: user.profile.gender });
    this.setState({ profilePic: user.profile.profilePic });

    this.setState({ isLoading: false });
  }

  // set the file in the state
  setFile = (file) => {
    this.setState({ file });
  };

  // set the text in the state
  setText = (text) => {
    this.setState({ text });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // like a post
  LikePost = async (id) => {
    this.props.likePost(id, this.props.user._id);
  };

  // unlike a post
  unLikePost = async (id) => {
    this.props.unlikePost(id, this.props.user._id);
  };

  // post a comment on a post
  postComment = async (id, comment) => {
    this.props.postComment(id, this.props.user._id, comment);

    document.getElementById(id).value = "";
  };

  //upload video or image post
  handleUpload = (e) => {
    e.preventDefault();
    const { file } = this.state;
    this.setState({ uploading: true });
    if (file === "") {
      this.createPost();
      this.setState({ uploading: false });
    } else {
      // allowed image types
      const imageTypes = [
        "image/webp",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];

      // upload the video or image
      const uploadTask = storage.ref(`uploads/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("uploads")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              // check whether upload is image or video
              if (imageTypes.includes(file.type)) {
                // set the imgUrl in the state
                this.setState({ imgUrl: url });
                this.createPost();
              } else {
                // set the vidUrl in the state
                this.setState({ vidUrl: url });
                this.createPost();
              }
            });
        }
      );
    }
  };

  //delete preview of image
  delImgPreview = () => {
    this.setFile("");
    document.getElementById("previews").style.display = "none";
    document.getElementById("image").style.display = "none";
    document.getElementById("img-preview").style.display = "none";
    document.getElementById("img-preview").setAttribute("src", "");
    document.getElementById("img-preview").removeAttribute("src");
  };

  //delete preview of video
  delVidPreview = () => {
    this.setFile("");
    document.getElementById("previews").style.display = "none";
    document.getElementById("video").style.display = " none";
    document.getElementById("video-preview").style.display = "none";
    document.getElementById("video-preview").setAttribute("src", "");
    document.getElementById("video-preview").removeAttribute("src");
  };

  //preview an image
  previewImg = (e) => {
    let file = e.target.files;
    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document.getElementById("previews").style.display = "";
        document.getElementById("image").style.display = "";
        document.getElementById("img-preview").style.display = "";
        document
          .getElementById("img-preview")
          .setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
      this.setFile(file[0]);
    }
  };

  //preview a video
  previewVideo = (e) => {
    let file = e.target.files;
    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document.getElementById("previews").style.display = "";
        document.getElementById("video").style.display = "";
        document.getElementById("video-preview").style.display = "";
        document
          .getElementById("video-preview")
          .setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
      this.setFile(file[0]);
    }
  };

  //create a post
  createPost = async () => {
    // get state
    const { text, imgUrl, vidUrl } = this.state;
    const id = this.props.user._id;
    const post = { text, imgUrl, vidUrl };

    //create post
    this.props.makePost(post, id);

    //clear state after creating post
    this.setState({ text: "" });
    this.setState({ imgUrl: "" });
    this.setState({ vidUrl: "" });

    //delete previews of post's image and video
    this.delImgPreview();
    this.delVidPreview();
    document.getElementById("post").value = "";
  };

  render() {
    const {
      text,
      uploading,
      isLoading,
      username,
      profilePic,
      story,
      gender,
    } = this.state;

    const {
      user,
      posts,
      sendFriendRequest,
      searchUsers,
      acceptFriendRequest,
      unFriend,
      declineFriendRequest,
      cancelFriendRequest,
    } = this.props;

    return isLoading ? (
      <div className="right-side">
        {" "}
        <Loader size="md" center />{" "}
      </div>
    ) : (
      <div className="right-side">
        {/* Creating paths to different routes */}
        <Switch>
          {/* Posts' route and path */}
          <ProtectedRoute
            exact
            path="/me/home"
            render={(props) => (
              <NewsFeed
                {...props}
                user={user}
                // setting props to posts route
                unlikePost={this.unLikePost}
                likePost={this.LikePost}
                posts={posts}
                uploading={uploading}
                setFile={this.setFile}
                text={text}
                createPost={this.createPost}
                handleUpload={this.handleUpload}
                setText={this.setText}
                previewImg={this.previewImg}
                previewVideo={this.previewVideo}
                delImgPreview={this.delImgPreview}
                delVidPreview={this.delVidPreview}
              />
            )}
          />

          {/* Searching route */}
          <ProtectedRoute
            path="/me/search/"
            render={(props) => (
              <Search
                {...props}
                user={user}
                searchUsers={searchUsers}
                acceptFriendRequest={acceptFriendRequest}
                declineFriendRequest={declineFriendRequest}
                unFriend={unFriend}
                cancelFriendRequest={cancelFriendRequest}
                sendFriendRequest={sendFriendRequest}
              />
            )}
          />

          {/* Profile route */}
          <ProtectedRoute
            path="/me/profile"
            render={(props) => (
              <Profile
                {...props}
                previewImg={this.previewImg}
                onChange={this.onChange}
                username={username}
                gender={gender}
                story={story}
                profilePic={profilePic}
              />
            )}
          />

          {/* Chatting route  */}
          <ProtectedRoute
            path="/me/chats"
            render={(props) => <Chat {...props} user={user} />}
          />

          {/*  Friends route and path */}
          <ProtectedRoute
            path="/me/friends"
            render={(props) => (
              <Friends
                {...props}
                user={user}
                unFriend={unFriend}
                cancelFriendRequest={cancelFriendRequest}
              />
            )}
          />

          {/* Friend Requests path */}
          <ProtectedRoute
            path="/me/friend-requests"
            render={(props) => (
              <FriendRequests
                {...props}
                user={user}
                acceptFriendRequest={acceptFriendRequest}
                declineFriendRequest={declineFriendRequest}
              />
            )}
          />

          {/* Specific post route */}
          <ProtectedRoute
            path="/me/home/posts/:id"
            render={(props) => (
              <SpecPost
                {...props}
                postComment={this.postComment}
                likePost={this.LikePost}
                unlikePost={this.unLikePost}
                user={user}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

RightBody.propTypes = {
  makePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  unFriend: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
  declineFriendRequest: PropTypes.func.isRequired,
  cancelFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  friends: state.user.friends,
});

export default connect(mapStateToProps, {
  makePost,
  likePost,
  unlikePost,
  postComment,
  unFriend,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
})(RightBody);
