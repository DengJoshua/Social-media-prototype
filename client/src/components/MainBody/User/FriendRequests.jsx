import React from "react";
import { Button } from "rsuite";

const FriendRequests = ({
  history,
  user,
  acceptFriendRequest,
  declineFriendRequest,
}) => {
  return (
    <div className="search-section" style={{ padding: "10px" }}>
      <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />
      <br />
      {user.friendRequests.length === 0 ? (
        <p>You have no friend requests.</p>
      ) : (
        user.friendRequests.map((request) => {
          return request._id.toString() === user._id.toString() ? null : (
            <div
              className="search-user d-flex justify-content-between"
              key={request._id}
            >
              <div className="d-flex">
                <img src={request.profilePic} alt={request.username} />
                <h6>{request.username}</h6>
              </div>
              <div className="user-btns">
                <Button
                  color="blue"
                  className="mr-2"
                  onClick={() => acceptFriendRequest(user._id, request._id)}
                >
                  Accept Request
                </Button>
                <Button
                  color="red"
                  onClick={() => declineFriendRequest(user._id, request._id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FriendRequests;
