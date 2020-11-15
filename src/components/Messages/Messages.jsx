import React, { Component } from 'react';
import Message from './Message'

class Messages extends Component {
    render() {
        const { messages, user, friend } = this.props

        return (
            <div className="chat-messages" id="chat-messages" >
                {
                    messages.length === 0 ? <p className="general-msg text-center" >You are now friends with {friend}.</p> :
                        messages.map(message => (
                            <Message message={message} user={user} friend={friend} key={message._id} />
                        ))
                }
            </div>
        );
    }
}

export default Messages;
