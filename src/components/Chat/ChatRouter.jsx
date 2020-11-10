import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import ChatMain from './ChatMain';
import { Route } from 'react-router-dom';

export default class ChatRouter extends Component {
    render() {
        const { sendMessage } = this.props
        return (
            <div className="chat-main" >
                <Switch>
                    <Route exact path="/me/chats" render={props => <p {...props}>Your messages will appear here.</p>} />
                    <Route path="/me/chats/:id" render={props => <ChatMain {...props} sendMessage={sendMessage} />} />
                </Switch>
            </div>
        )
    }
}
