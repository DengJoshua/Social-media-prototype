import React, { useEffect, useState } from 'react'
import Messages from '../Messages/Messages'
import { getUserProps } from '../../services/userService';
import { getMessages } from '../../services/friendsService';
import SendMessage from '../Messages/sendMessage';
import { SendText } from '../../services/friendsService';
import { Loader } from 'rsuite';
import io from 'socket.io-client';

let socket

const ChatMain = ({ match, user }) => {
    const [isLoading, setIsloading] = useState(true)
    const [friend, setFriend] = useState(null)
    const [messages, setMessages] = useState([])
    const ENPOINT = "localhost:5000"
    const [message, setMessage] = useState('')


    useEffect(() => {
        const friendId = match.params.id
        const name = match.params.name

        async function fetchData() {
            const { data } = await getUserProps(friendId)
            // const { data: msg } = await getMessages(user._id, friendId)
            // setMessages(msg)
            setFriend(data)
            setIsloading(false)
        }
        fetchData()

        socket = io(ENPOINT)
        socket.emit('join', { room: friendId, name }, () => {
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENPOINT, match.params.id, match.params.name])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

    }, [messages])

    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    // const sendMessage = async () => {
    //     await SendText(user._id, friend._id, message)
    //     emitMessage()
    //     const form = document.getElementById('msg')
    //     form.value = ""
    //     const chatmsgs = document.querySelector('.chat-messages')
    //     chatmsgs.scrollTop = chatmsgs.scrollHeight
    // }

    return isLoading ? <Loader center /> : (
        <div>
            <header className="chat-header">
                <img src={friend.profile.profilePic} alt={friend.username} />
                <p className="username ml-2" >{friend.username}</p>
            </header>
            <Messages messages={messages} user={user} friend={friend.username} />
            <SendMessage sendMessage={sendMessage} setMessage={setMessage} message={message} />
        </div>
    )
}

export default ChatMain;