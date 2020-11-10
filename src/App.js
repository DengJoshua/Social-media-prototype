import React, { Component } from 'react'
import Container from './components/Container';
import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home Page/Home';
import UpdateProfile from './components/MainBody/UpdateProfile';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch >
        <Route path="/home" component={Home} />
        <Route path="/updateProfile" component={UpdateProfile} />
        <Route path="/me/home" component={Container} />
        <Route path="/me/:userpage" component={Container} />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;