import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import NewsFeed from './NewsFeed';
import Profile from './Profile';
import Search from './Search';
import Chat from '../Chat/Chat';
import FriendRequests from './FriendRequests';
import Friends from './Friends';

class RightBody extends Component {
    render() {
        const { user } = this.props;

        return (
        <div className="right-side" >
        <Switch >
        <Route exact path="/me/home" render={props => <NewsFeed user={user} {...props} />}/>
        <Route path="/me/search/" render={props => <Search {...props} user={user}  />} />
        <Route path="/me/profile" render={props => <Profile {...props} user={user} />} />
        <Route path="/me/chats" render={props => <Chat {...props} user={user} />} />
        <Route path="/me/friends" component={Friends} />
        <Route path="/me/friend-requests" component={FriendRequests} />
        </Switch>
        </div>
        );
    }
    
}

export default RightBody;
