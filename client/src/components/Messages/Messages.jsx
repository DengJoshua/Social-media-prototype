import React from 'react';
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'



function Messages({ messages, user, friend, scrollToBottom }) {
    return (
        <ScrollToBottom value={scrollToBottom} >
            <div className="chat-messages" id="chat-messages"
            >
                {
                    messages.length === 0 ? <p className="general-msg text-center" >You are now friends with {friend}.</p> :
                        messages.map(message => (
                            <Message message={message} user={user} friend={friend} key={message._id} />
                        ))
                }
            </div>
        </ScrollToBottom>
    );
}

export default Messages;
