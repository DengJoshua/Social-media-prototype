import React, { Component } from "react";

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment" key={comment._id}>
        <section style={{ display: "flex" }}>
          <img
            src={comment.user.profilePic}
            className="profile-pic"
            alt={comment.user.username}
          />
          <section className="ml-2">
            <p className="username">{comment.user.username}</p>
            <p className="date">{this.props.formatDate(comment.createdAt)}</p>
          </section>
        </section>
        <p className="ml-5">{comment.comment}</p>
      </div>
    );
  }
}

export default Comment;
