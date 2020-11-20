import React, { Component } from 'react';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';

import Menu from './Menu';

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="mynavbar" >
        <Menu user={user} />
        <Sidenav defaultOpenKeys={['3', '4']} activeKey="1" componentClass="div" style={{ background: "transparent" }}  >
          <Sidenav.Body>
            <Nav>
              <Dropdown
                eventKey="4"
                title="Account"
                icon={<Icon icon="user" />}
              >
                <Dropdown.Item eventKey="4-1" >
                  <div className="user" style={{ background: "transparent!important" }} >
                    <img src={user.profile.profilePic} className="profile-pic" alt="" />
                    <div className="ml-2" >
                      <p className="username" >{user.username}</p>
                        @user#tags
                   </div>
                  </div>
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <img src={require('../images/premier league.png')} style={{ width: "120px", height: "120px", borderRadius: "5px", margin: 'auto', position: "absolute" }} alt={user.username} />
      </div>
    );
  }
}

export default NavBar;