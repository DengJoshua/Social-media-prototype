import React from 'react';

const Message = ({ message, user, friend }) => {

    return message.from === user._id ? (
        <div className="message">
            <section className="mine ml-auto" >
                <p className="meta">Me <span>11: 57 am</span></p>
                <p className="text">
                    {message.message}
                </p>
            </section>
        </div>
    ) : (
            <div className="message mr-auto">
                <section className="not-mine" >
                    <p className="meta">{friend} <span>12: 05 pm</span></p>
                    <p className="text">
                        {message.message}
                    </p>
                </section>
            </div>
        )
}


export default Message;