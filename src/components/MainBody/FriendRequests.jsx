import React, { useEffect, useState } from 'react';
import { getUserProps } from '../../services/userService';
import { getCurrentUser } from '../../services/authService';
import { Button, Loader } from 'rsuite';
import {
  acceptFriendRequest,
  declineFriendRequest
} from '../../services/friendsService';
import { Link } from 'react-router-dom';

const FriendRequests = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const user = getCurrentUser();
    async function fetchUsers() {
      const { data: me } = await getUserProps(user._id);
      setUser(me);
      setIsLoading(false)
    }
    fetchUsers();
  }, [user]);

  const acceptfriendRequest = async (myId, reqId) => {
    await acceptFriendRequest(myId, reqId);
    const { data } = await getUserProps(myId);
    setUser(data);
  };

  const declinefriendRequest = async (myId, reqId) => {
    await declineFriendRequest(myId, reqId);
    const { data } = await getUserProps(myId);
    setUser(data);
  };

  return isLoading ? (
    <Loader
      style={{ margin: 'auto', display: 'block' }}
    />
  ) : (
      <div className="search-section">
        <Link to="/me/home"  ><i className="fa fa-arrow-left goback" /></Link>
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
                    <h6>{request.username}</h6>
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