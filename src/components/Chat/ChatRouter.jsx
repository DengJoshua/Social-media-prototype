import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import ChatMain from './ChatMain';
import { Route } from 'react-router-dom';

export default class ChatRouter extends Component {
    render() {
        const { sendMessage, user } = this.props;
        return (
            <div className="chat-main" >
                <Switch>
                    <Route exact path="/me/chats" render={props => <p className="general-msg text-center" >Select a friend and conversations will appear here.</p>} />
                    <Route path="/me/chats/:id" render={props => <ChatMain {...props} sendMessage={sendMessage} user={user} />} />
                </Switch>
            </div>
        )
    }
}
