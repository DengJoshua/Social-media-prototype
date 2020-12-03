import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Button, Icon } from 'rsuite'

class Menu extends Component {


    render() {
        const { user, Logout } = this.props;
        return (
            <React.Fragment>
                <div className="p-4" id={user._id} >
                    <i className="fa fa-instagram m-2 logo" style={{ fontSize: "50px" }} /> TWEETFLASH
            </div>
                <h3>Menu</h3>
                <div className="menu">
                    <NavLink to="/me/home" className="navlink" activeClassName="active-nav-link" >
                        <h6><i className="fa fa-home"></i> Home</h6>
                    </NavLink>
                    <NavLink to="/me/chats" className="navlink" activeClassName="active-nav-link" >
                        <h6><Icon icon="envelope" /> Chat </h6>
                    </NavLink>
                    <NavLink to="/me/profile" className="navlink" activeClassName="active-nav-link" >
                        <h6><Icon icon="user" />   Profile </h6>
                    </NavLink>
                    <NavLink to="/me/friends" className="navlink" activeClassName="active-nav-link" >
                        <h6><i className="fa fa-users"></i> My Friends ({user.friends.length}) </h6>
                    </NavLink>
                    <NavLink to="/me/friend-requests" className="navlink" activeClassName="active-nav-link" >
                        <h6><i className="fa fa-home"></i> {this.props.user.friendRequests.length === 0 ? "FriendRequests" :
                            <React.Fragment>FriendRequests <Badge content={this.props.user.friendRequests.length} /></React.Fragment>
                        }</h6>
                    </NavLink>
                    <Button color="cyan" onClick={Logout}>Logout</Button>
                </div>
            </React.Fragment>

        )
    }
}

export default Menu
