import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { register } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";

class SignUp extends Form {
  state = {
    data: { email: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("First Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      const response = await register(data);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/updateProfile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="sign-up">
          <form onSubmit={this.handleSubmit}>
            <h5 className="mb-1">Sign Up</h5>
            <img
              src={require("../../images/avatar1.png")}
              className="profile-pic mb-2 "
              alt=""
            />
            {this.createInput("email", "Email", "email")}
            {this.createInput("username", "Enter Username")}
            {this.createInput("password", "Enter Password", "password")}
            {this.createButton("Sign Up")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
