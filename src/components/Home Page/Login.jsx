import { login } from '../../services/authService';
import Form from '../common/form';
import React from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        }, 
        errors: []
   }

   schema = {
        email: Joi.string().required(),
        password: Joi.string().min(5).required()   
    }

    doSubmit = async () => {
        const { data } = this.state;
        try {
            const { data: response } = await login(data)    
            sessionStorage.setItem("token", response)
            window.location = "/me/home"
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
    }}}

    render() {
        return (
            <React.Fragment> 
            <div id="login">
                <form onSubmit={this.handleSubmit}>
                <h5>Login into Account</h5>
                <img src={require('../../images/avatar1.png')} className="profile-pic m-2" alt=""/>
               {this.createInput("email", "Email", "email")}
               {this.createInput("password", "Enter Password", "password")}
               <p className="text-left" >Forgot your password <Link to="/" className="mb-3"  >Change it.</Link></p>
               <br/>
               {this.createButton("Login")}
                </form>
            </div>
            </React.Fragment>
        );
    }
}

export default Login;