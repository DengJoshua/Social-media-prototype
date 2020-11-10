import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

export default class ChatSide extends Component {
    render() {
    const { friends } = this.props;
        return (
            <div className="chat-side" >
                <Search />
                <div className="friends" >
                {
                friends.map(friend => (
                <NavLink className="navlink d-flex" 
                activeClassName="active-nav-link"
                to={`/me/chats/${friend._id}`}
                key={friend._id}
                >
                    <img className="mr-2"  src={friend.profilePic} alt="" />
                    <p>{friend.username}</p>
                </NavLink>
                ))}
                </div>
            </div>
        )
    }
}
