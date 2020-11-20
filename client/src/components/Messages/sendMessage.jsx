import React, { Component } from 'react'
import { Button } from 'rsuite';



class SendMessage extends Component {
    render() {
        const { sendMessage, message, setMessage } = this.props;
        return (
            <div className="chat-form-container">
                <div id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        value={message}
                        autoComplete="off"
                        onChange={e => setMessage(e.target.value)}
                    />
                    <Button className="ml-2" appearance='primary'
                        onClick={() => sendMessage()}
                    ><i className="fa fa-paper-plane"></i> Send</Button>
                </div>
            </div>
        )
    }
}

export default SendMessage;