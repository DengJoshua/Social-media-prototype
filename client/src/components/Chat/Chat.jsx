import React, { useEffect, useState } from 'react';
import './Chat.css'
import ChatSide from './ChatSide';
import { Loader } from 'rsuite';
import ChatRouter from './ChatRouter';
import { getCurrentUser } from '../../services/authService';
import { getUserProps } from '../../services/userService';

const Chat = () => {
  const [friends, setFriends] = useState([])
  const [user, setUser] = useState(null)
  const [isloading, setisLoading] = useState(true)


  useEffect(() => {
    const result = getCurrentUser()
    async function fetchData() {
      const { data: response } = await getUserProps(result._id)
      setUser(response)
      setFriends(response.friends)
      setisLoading(false)
    }
    fetchData()
  }, [user, friends])


  return isloading ? <Loader center /> : (
    <div style={{ margin: "10px" }}>
      <div className="chat p-0 align-baseline">
        <ChatSide friends={friends} />
        <ChatRouter user={user} />
      </div>
    </div>

  );

}

export default Chat;