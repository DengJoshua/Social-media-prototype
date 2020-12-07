import React from "react";
import { Sidenav, Nav, Dropdown, Icon } from "rsuite";

import Menu from "./Menu";

const NavBar = ({ user, Logout }) => {
  return (
    <div className="mynavbar">
      <Menu user={user} Logout={Logout} />
      <Sidenav
        defaultOpenKeys={["3", "4"]}
        activeKey="1"
        componentClass="div"
        style={{ background: "transparent" }}
      >
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey="4" title="Account" icon={<Icon icon="user" />}>
              <Dropdown.Item eventKey="4-1">
                <div
                  className="user"
                  style={{ background: "transparent!important" }}
                >
                  <img
                    src={user.profile.profilePic}
                    className="profile-pic"
                    alt=""
                  />
                  <div className="ml-2">
                    <p className="username">{user.username}</p>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <img
        src={require("../images/premier league.png")}
        style={{ width: "180px", height: "180px" }}
        className="rounded d-block mx-auto"
        alt={user.username}
      />
    </div>
  );
};

export default NavBar;
