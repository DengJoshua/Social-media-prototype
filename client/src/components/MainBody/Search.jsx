import React, { useEffect, useState } from 'react';
import { getUserProps, searchUsers } from '../../services/userService';
import { getCurrentUser } from '../../services/authService';
import queryString from 'query-string';
import { Button, Loader } from 'rsuite';
import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  unFriendUser,
} from '../../services/friendsService';
import { Link } from 'react-router-dom';

const Search = ({ location, history }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Query, setQuery] = useState("")


  useEffect(() => {
    const result = queryString.parse(location.search)
    const user = getCurrentUser();
    async function fetchUsers() {
      const { data } = await searchUsers(result.query);
      const { data: me } = await getUserProps(user._id);
      setUser(me);
      setUsers(data);
      setQuery(result.query)
      setIsLoading(false);
    }
    fetchUsers();
  }, [location.search, users]);

  const sendfriendRequest = async (myId, reqId) => {
    await sendFriendRequest(myId, reqId);
    const { data } = await getUserProps(myId);
    setUser(data);
  };

  const cancelfriendRequest = async (myId, reqId) => {
    await cancelFriendRequest(myId, reqId);
    const { data } = await getUserProps(myId);
    setUser(data);
  };

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

  const unfriend = async (myId, reqId) => {
    await unFriendUser(myId, reqId);
    const { data } = await getUserProps(myId);
    setUser(data);
  };

  return isLoading ? (
    <Loader center />
  ) : (
      <div className="search-section" style={{ padding: "10px" }}>
        {users.length === 0 ? (
          <React.Fragment>
            <Link to="/me/home"  ><i className="fa fa-arrow-left goback" /></Link>
            <h6>No results found for "{Query}".</h6>
          </React.Fragment>
        ) : (
            <div className="search-section">
              <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />
              <h6>Showing search results for "{Query}".</h6>
              {users.map((listItem) => {
                return listItem._id.toString() === user._id.toString() ? null : (
                  <div className="search-user d-flex justify-content-between" key={listItem._id} >
                    <div className="d-flex">
                      <img
                        src={listItem.profile.profilePic}
                        alt={listItem.username}
                      />
                      <h6>{listItem.username}</h6>
                    </div>
                    <React.Fragment>{checkIsFriend(listItem)}</React.Fragment>
                  </div>
                )
              })
              }
            </div>
          )}
      </div>
    );

  function checkIsFriend(check) {
    let len = user.friends.length
    for (let i = 0; i < len; i++) {
      let friend = user.friends[i];
      if (friend._id.toString() === check._id.toString()) {
        if (friend.status.toString() === 'pending') {
          return (
            <div className="user-btns">
              <Button
                color="cyan"
                className="mr-2"
              >
                Request sent.
          </Button>
              <Button
                color="red"
                onClick={() => cancelfriendRequest(user._id, check._id)}
              >
                Cancel Request
          </Button>
            </div>
          );
        } else
          return (
            <div className="user-btns float-right">
              <Link to={`/me/chats/${check._id}/${check.username}`}  >
                <Button color="blue" className="mr-2">
                  Send Message
          </Button>
              </Link>
              <Button
                color="red"
                appearance="ghost"
                onClick={() => unfriend(user._id, check._id)}
              >
                Unfriend
          </Button>
            </div>
          );
      }
      let frnlen = user.friendRequests.length
      for (let i = 0; i < frnlen; i++) {
        let friendRequest = user.friendRequests[i];
        if (friendRequest._id.toString() === check._id.toString()) {
          return (
            <div className="user-btns">
              <Button
                color="blue"
                className="mr-2"
                onClick={() => acceptfriendRequest(user._id, check._id)}
              >
                Accept Request
        </Button>
              <Button
                color="red"
                onClick={() => declinefriendRequest(user._id, check._id)}
              >
                Decline
        </Button>
            </div>
          );
        }
      }
    }
    return (
      <div className="user-btns">
        <Button
          color="blue"
          onClick={() => sendfriendRequest(user._id, check._id)}
        >
          Add Friend
        </Button>
      </div>
    )
  }
};

export default Search;
