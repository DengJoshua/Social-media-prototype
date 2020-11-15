import React from 'react';
import { Button } from 'rsuite';
import { unFriendUser } from '../../../services/friendsService';
import { Link } from 'react-router-dom';

const Friends = ({ history, user }) => {
  const unfriend = async (myId, reqId) => {
    await unFriendUser(myId, reqId);
  };

  return (user.friends.length === 0 ? <div><i className="fa fa-arrow-left goback" onClick={() => history.goBack()} /> <p>You currently have no friends.</p></div> :
    <React.Fragment>
      <i className="fa fa-arrow-left goback" onClick={() => history.goBack()} />
      {user.friends.map(friend => (
        <div className="search-user d-flex justify-content-between" key={friend._id} >
          <div className="d-flex">
            <img
              src={friend.profilePic}
              alt={friend.username}
            />
            <p>{friend.username}</p>
          </div>
          <div className="user-btns float-right">
            <Link to={`/me/chats/${friend._id}`} >
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

      ))}
    </React.Fragment>
  );
}

export default Friends;