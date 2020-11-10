import React, { useEffect, useState } from 'react';
import './Chat.css'
import ChatSide from './ChatSide';
import { Loader } from 'rsuite';
import ChatRouter from './ChatRouter';
import { getCurrentUser } from '../../services/authService';
import { getUserProps } from '../../services/userService';
import { SendMessage } from '../../services/friendsService';


const Chat = () => {
  const [friends, setFriends] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
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
  }, [user])

  const sendMessage = async (myId, friedId, message) => {
    await SendMessage(myId, friedId, message)
    const { data } = await getUserProps(myId)
    setUser(data)
  }

  return isloading ? <Loader className="right-side" style={{ margin: "auto", display: 'block' }} /> : (
    <React.Fragment>
      <div className="chat p-0 align-baseline ">
        <ChatSide friends={friends} />
        <ChatRouter user={user} sendMessage={sendMessage} />
      </div>
    </React.Fragment>

  );
}

export default Chat;