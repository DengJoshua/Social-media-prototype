import React, { Component } from "react";
import MainBody from "./MainBody/MainBody";
import NavBar from "./NavBar";
import { Loader } from "rsuite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser, fetchPosts } from "../actions/userActions";
import { getCurrentUser } from "../services/authService";

class Container extends Component {
  componentDidMount() {
    // get current user
    const result = getCurrentUser();
    this.props.fetchPosts();
    this.props.fetchUser(result._id);
  }

  render() {
    const { isLoading, user, Logout, posts } = this.props;

    return isLoading ? (
      <Loader size="md" center />
    ) : (
      <div className="main">
        <div className="d-flex h-100">
          <NavBar user={user} Logout={Logout} />
          <MainBody user={user} posts={posts} />
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchUser, fetchPosts })(Container);
