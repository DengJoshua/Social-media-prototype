import React, { useEffect, useState } from 'react';
import { searchUsers } from '../../services/userService';
import queryString from 'query-string';
import { Button, Loader } from 'rsuite';

import { Link } from 'react-router-dom';

const Search = ({ location, history, user,
  acceptfriendRequest,
  declinefriendRequest, unfriend,
  cancelfriendRequest, sendfriendRequest
}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Query, setQuery] = useState("")


  useEffect(() => {
    const result = queryString.parse(location.search)
    // fetch search data
    async function fetchUsers() {
      const { data } = await searchUsers(result.query);
      setUsers(data);
      setQuery(result.query)
      setIsLoading(false);
    }
    fetchUsers();
  }, [location.search, users]);


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
  // check whether is my friend
  function checkIsFriend(check) {
    let len = user.friends.length
    for (let i = 0; i < len; i++) {
      let friend = user.friends[i];
      // is friend request is pending
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
          // if is my friend
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
      // check whether is search result is a friend request
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
    // if user is not my friend
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
