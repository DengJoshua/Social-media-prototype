import React from 'react';
import { Button } from 'rsuite';
import {
  acceptFriendRequest,
  declineFriendRequest
} from '../../../services/friendsService';

const FriendRequests = ({ history, user }) => {

  const acceptfriendRequest = async (myId, reqId) => {
    await acceptFriendRequest(myId, reqId);
  };

  const declinefriendRequest = async (myId, reqId) => {
    await declineFriendRequest(myId, reqId);
  };

  return (
    <div className="search-section">
      <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />
      <br />
      {
        user.friendRequests.length === 0 ? <p>You have no friend requests.</p> :
          user.friendRequests.map((request) => {
            return request._id.toString() === user._id.toString() ? null : (
              <div className="search-user d-flex justify-content-between" key={request._id} >
                <div className="d-flex">
                  <img
                    src={request.profilePic}
                    alt={request.username}
                  />
                  <p className="username" >{request.username}</p>
                </div>
                <div className="user-btns">
                  <Button
                    color="blue"
                    className="mr-2"
                    onClick={() => acceptfriendRequest(user._id, request._id)}
                  >
                    Accept Request
            </Button>
                  <Button
                    color="red"
                    onClick={() => declinefriendRequest(user._id, request._id)}
                  >
                    Decline
            </Button>
                </div>
              </div>
            )
          })
      }
    </div>
  );
}



export default FriendRequests;