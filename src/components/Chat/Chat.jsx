import React, { useEffect, useState } from 'react';
import './Chat.css'
import ChatSide from './ChatSide';
import { Loader } from 'rsuite';
import ChatRouter from './ChatRouter';
import { getCurrentUser } from '../../services/authService';
import { getUserProps } from '../../services/userService';
import { SendMessage } from '../../services/friendsService';
// import socket from 'socket.io-client';


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
  }, [user])

  const sendMessage = async (friedId, message, e) => {
    await SendMessage(user._id, friedId, message)
    const form = document.getElementById('msg')
    form.value = ""
    const { data } = await getUserProps(user._id)
    setUser(data)
    const chatmsgs = document.querySelector('.chat-messages')
    chatmsgs.scrollTop = chatmsgs.scrollHeight
  }


  return isloading ? <Loader center /> : (
    <React.Fragment>
      <div className="chat p-0 align-baseline ">
        <ChatSide friends={friends} />
        <ChatRouter user={user} sendMessage={sendMessage} />
      </div>
    </React.Fragment>

  );

}

export default Chat;