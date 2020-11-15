import React, { Component } from 'react'
import { Button } from 'rsuite';



class SendMessage extends Component {
    state = {
        message: ""
    }

    render() {
        const { sendMessage, friend } = this.props
        const { message } = this.state

        return (
            <div className="chat-form-container">
                <div id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        onChange={e => this.setState({ message: e.target.value })}
                    />
                    <Button className="ml-2" appearance='primary'
                        onClick={() => sendMessage(friend._id, message)}
                    ><i className="fa fa-paper-plane"></i> Send</Button>
                </div>
            </div>
        )
    }
}

export default SendMessage;