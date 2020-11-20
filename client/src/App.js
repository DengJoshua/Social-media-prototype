import React, { Component } from 'react'
import Container from './components/Container';
import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home Page/Home';
import UpdateProfile from './components/MainBody/User/UpdateProfile';
import ProtectedRoute from './components/common/protectedRoute'


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch >
        <Route path="/home" component={Home} />
        <ProtectedRoute path="/updateProfile" component={UpdateProfile} />
        <ProtectedRoute path="/me/home" component={Container} />
        <ProtectedRoute path="/me/:userpage" component={Container} />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;