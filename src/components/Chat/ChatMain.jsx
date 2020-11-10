import React, { useEffect, useState } from 'react'
import SendMessage from '../Messages/sendMessage'
import Messages from '../Messages/Messages'
import Spinner from '../common/Spinner';
import { getUserProps } from '../../services/userService';


const ChatMain = ({ match }) => {
    const [isLoading, setIsloading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const frienId = match.params.id
            const { data } = await getUserProps(frienId)
            setUser(data)
            setIsloading(false)
        }
        fetchData()

    }, [match.params.id])


    return isLoading ? <Spinner /> : (
        <div>
            <header className="chat-header">
                <img src={user.username} alt="" />
                <h4>{user.username}</h4>
            </header>
            <Messages />
            <SendMessage />
        </div>
    )
}

export default ChatMain;