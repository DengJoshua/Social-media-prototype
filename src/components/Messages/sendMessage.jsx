import React, { Component } from 'react'

class SendMessage extends Component {
    render() {
        const { sendMessage } = this.props

        return (
            <div className="chat-form-container">
                <form id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                    />
                    <button className="btn btn-primary ml-2"
                        onClick={sendMessage}


                    ><i className="fa fa-paper-plane"></i> Send</button>
                </form>
            </div>
        )
    }
}

export default SendMessage;