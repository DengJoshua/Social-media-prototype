import React, { useEffect, useState } from 'react'
import Messages from '../Messages/Messages'
import { getUserProps } from '../../services/userService';
import { getMessages } from '../../services/friendsService';
import SendMessage from '../Messages/sendMessage';
import { Loader } from 'rsuite';


const ChatMain = ({ match, user, sendMessage }) => {
    const [isLoading, setIsloading] = useState(true)
    const [friend, setFriend] = useState(null)
    const [messages, setMessages] = useState([])


    useEffect(() => {
        async function fetchData() {
            const frienId = match.params.id
            const { data } = await getUserProps(frienId)
            const { data: msg } = await getMessages(user._id, frienId)
            setMessages(msg)
            setFriend(data)
            setIsloading(false)
        }
        fetchData()

    }, [match.params.id, user._id])


    return isLoading ? <Loader center /> : (
        <div>
            <header className="chat-header">
                <img src={friend.profile.profilePic} alt={friend.username} />
                <p className="username ml-2" >{friend.username}</p>
            </header>
            <Messages messages={messages} user={user} friend={friend.username} />
            <SendMessage sendMessage={sendMessage} friend={friend} />
        </div>
    )
}

export default ChatMain;