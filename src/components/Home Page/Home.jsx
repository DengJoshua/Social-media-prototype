import React, { Component } from 'react'
import { Instagram } from '@material-ui/icons';
import SignUp from './signup';
import Login from './Login';
import './home.css'

class Home extends Component {
    render() {
        return (
            <div className="home-page">
            <div className="forms">
            <SignUp /> 
            <Login />    
            </div>
            <div className="lefter">
            <h1><Instagram  /></h1>
            <h4>TWEETFLASH</h4>
            </div>
            </div>
        )
    }
}

export default Home;