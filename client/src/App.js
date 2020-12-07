import React, { Component } from "react";
import Container from "./components/Container";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home Page/Home";
import UpdateProfile from "./components/MainBody/User/UpdateProfile";
import ProtectedRoute from "./components/common/protectedRoute";
import { Button } from "rsuite";
import { logout } from "./services/authService";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  Logout = () => {
    const logoutbox = document.getElementById("logout");
    logoutbox.style.display = "";
    logoutbox.parentElement.style.overflow = "hidden";
    console.log(logoutbox);
  };

  completeLogout = () => {
    logout();
    window.location = "/home";
  };

  cancelLogout = () => {
    const logoutbox = document.getElementById("logout");
    logoutbox.style.display = "none";
    logoutbox.parentElement.style.overflow = "auto";
  };

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div id="logout" style={{ display: "none" }}>
            <div className="wrapper">
              <p className="mb-2">Are you sure.</p>
              <Button
                color="red"
                className="mr-2"
                onClick={this.completeLogout}
              >
                Yes
              </Button>
              <Button color="blue" onClick={this.cancelLogout}>
                No
              </Button>
            </div>
          </div>
          <Switch>
            <Route path="/home" component={Home} />
            <ProtectedRoute path="/updateProfile" component={UpdateProfile} />
            <ProtectedRoute
              path="/me/home"
              render={(props) => <Container {...props} Logout={this.Logout} />}
            />
            <ProtectedRoute
              path="/me/:userpage"
              render={(props) => <Container {...props} Logout={this.Logout} />}
            />
            <Redirect exact from="/" to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
