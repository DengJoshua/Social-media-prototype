import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/authService';
import { getUserProps } from '../../services/userService';
import { Button, Loader } from 'rsuite';
import { unFriendUser } from '../../services/friendsService';
import { Link } from 'react-router-dom';

const Friends = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const result = getCurrentUser()
    async function fetchData() {
      const { data: me } = await getUserProps(result._id)
      setUser(me)
      setIsLoading(false)
    }
    fetchData()
  }, [user])

  const unfriend = async (myId, reqId) => {
    await unFriendUser(myId, reqId);
    const { data } = await getUserProps(myId)
    setUser(data)
  };

  return isLoading ?
    <Loader
      style={{ margin: 'auto', display: 'block' }}
    /> :
    (user.friends.length === 0 ? <div><Link to="/me/home"  ><i className="fa fa-arrow-left goback" /></Link> <p>You currently have no friends.</p></div> :
      <React.Fragment>
        <Link to="/me/home"  ><i className="fa fa-arrow-left goback" /></Link>
        {user.friends.map(friend => (
          <div className="search-user d-flex justify-content-between" key={friend._id} >
            <div className="d-flex">
              <img
                src={friend.profilePic}
                alt={friend.username}
              />
              <h6>{friend.username}</h6>
            </div>
            <div className="user-btns float-right">
              <Button color="blue" className="mr-2">
                Send Message
              </Button>
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