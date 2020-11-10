import React from 'react';


const Message = ({message}) => {
    return ( 
            <div className="message ml-auto bg-primary">
                <p className="meta">Brad <span>{message.time}</span></p>
                <p className="text">
                   {message.text}
                </p>
                </div>
    );
}
 
export default Message;