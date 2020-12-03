import React from 'react';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
// import { getUserProps } from '../services/userService';
// import { getCurrentUser } from '../services/authService'


import Menu from './Menu';

const NavBar = ({ user, Logout }) => {
  // const [user, setUser] = useState(null)
  // const [isLoaiding, setIsloading] = useState(true)
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = getCurrentUser()
  //     const { data } = await getUserProps(result._id)
  //     setUser(data)
  //     setIsloading(false)
  //   }
  //   fetchData()
  // }, [user])

  return (
    <div className="mynavbar" >
      <Menu user={user} Logout={Logout} />
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
      <img src={require('../images/premier league.png')} style={{ width: "120px", height: "120px" }} className="rounded d-block mx-auto" alt={user.username} />
    </div>
  );
}

export default NavBar;