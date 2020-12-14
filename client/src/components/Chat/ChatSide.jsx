import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

export default class ChatSide extends Component {
  render() {
    const { friends } = this.props;
    return (
      <div className="chat-side">
        <Search />
        <div className="friends">
          {friends.length === 0 ? (
            <NavLink to="/me/home" className="text-center align-self-center">
              Find Friends
            </NavLink>
          ) : (
            friends.map((friend) =>
              friend.status === "pending" ? null : (
                <NavLink
                  className="friend d-flex"
                  activeClassName="active-friend"
                  to={`/me/chats/${friend._id}/${friend.username}`}
                  key={friend._id}
                >
                  <img className="mr-2" src={friend.profilePic} alt="" />
                  <h6>{friend.username}</h6>
                </NavLink>
              )
            )
          )}
        </div>
      </div>
    );
  }
}
