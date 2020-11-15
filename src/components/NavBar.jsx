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
                    <div className="ml-2" >
                      <p className="username" >{user.username}</p>
                        @user#tags
                   </div>
                  </div>
                  <img src={user.profile.profilePic} style={{ width: "150px", height: "150px", borderRadius: "5px" }} alt={user.username} />
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}

export default NavBar;