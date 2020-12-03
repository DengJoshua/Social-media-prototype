import React from 'react';

const Message = ({ message, user, friend }) => {

    // check message is mine
    return message.from === user._id ? (
        <div className="message">
            <section className="mine ml-auto" >
                <p className="meta">Me <span style={{ fontSize: '12px', color: "#f1f", float: "right" }}>{message.time}</span></p>
                <p className="text">
                    {message.message}
                </p>
            </section>
        </div>
    ) : (
            <div className="message mr-auto">
                <section className="not-mine" >
                    <p className="meta">{friend} <span style={{ fontSize: '12px', color: "#f1f", float: "right" }} >{message.time}</span></p>
                    <p className="text">
                        {message.message}
                    </p>
                </section>
            </div>
        )
}


export default Message;