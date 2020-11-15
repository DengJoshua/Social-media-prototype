import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Icon } from 'rsuite'

class Menu extends Component {
    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="p-5" id={user._id} >
                    <i className="fa fa-instagram m-2 logo" style={{ fontSize: "50px" }} /> TWEETFLASH
            </div>
                <h3>Menu</h3>
                <div className="menu">
                    <NavLink to="/me/home" className="navlink" activeClassName="active-nav-link" >
                        <i className="fa fa-home"></i>      Home
          </NavLink>
                    <NavLink to="/me/chats" className="navlink" activeClassName="active-nav-link" >
                        <Icon icon="envelope" /> Chat
          </NavLink>
                    <NavLink to="/me/profile" className="navlink" activeClassName="active-nav-link" >
                        <Icon icon="user" />   Profile
          </NavLink>
                    <NavLink to="/me/friends" className="navlink" activeClassName="active-nav-link" >
                        <i className="fa fa-users"></i> My Friends ({user.friends.length})
          </NavLink>
                    <NavLink to="/me/settings" className="navlink" activeClassName="active-nav-link" >
                        <i className="fa fa-cog"></i>      Settings
          </NavLink>
                    <NavLink to="/me/friend-requests" className="navlink" activeClassName="active-nav-link" >
                        <i className="fa fa-home"></i> {this.props.user.friendRequests.length === 0 ? "FriendRequests" :
                            <React.Fragment>FriendRequests <Badge content={this.props.user.friendRequests.length} /></React.Fragment>
                        }
                    </NavLink>
                </div>
            </React.Fragment>

        )
    }
}

export default Menu
