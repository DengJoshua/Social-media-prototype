import React from "react";
import { Button } from "rsuite";
import { Link } from "react-router-dom";

const Friends = ({ history, user, unfriend, cancelfriendRequest }) => {
  return user.friends.length === 0 ? (
    <div style={{ padding: "10px" }}>
      <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />{" "}
      <p>You currently have no friends.</p>
    </div>
  ) : (
    <div style={{ padding: "10px" }}>
      <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />
      {user.friends.map((friend) =>
        friend.status === "pending" ? (
          <div
            className="search-user d-flex justify-content-between"
            key={friend._id}
          >
            <div className="d-flex">
              <img src={friend.profilePic} alt={friend.username} />
              <h6>{friend.username}</h6>
            </div>
            <div className="user-btns">
              <Button color="cyan" className="mr-2">
                Request sent.
              </Button>
              <Button
                color="red"
                onClick={() => cancelfriendRequest(user._id, friend._id)}
              >
                Cancel Request
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="search-user d-flex justify-content-between"
            key={friend._id}
          >
            <div className="d-flex">
              <img src={friend.profilePic} alt={friend.username} />
              <h6>{friend.username}</h6>
            </div>
            <div className="user-btns float-right">
              <Link to={`/me/chats/${friend._id}/${friend.username}`}>
                <Button color="blue" className="mr-2">
                  Send Message
                </Button>
              </Link>
              <Button
                color="red"
                appearance="ghost"
                onClick={() => unfriend(user._id, friend._id)}
              >
                Unfriend
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Friends;
