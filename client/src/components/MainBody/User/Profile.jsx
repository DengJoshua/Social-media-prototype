import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class Profile extends Component {
  render() {
    const { onChange, profilePic, story, gender, username } = this.props;
    return (
      <div className="w-100">
        <div className="profile-page">
          <p className="username">{username}</p>
          <br />
          <img
            src={profilePic}
            style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            alt=""
            className="rounded-circle"
          />
          <label style={{ width: "20px" }}>
            <input type="file" />
            <i className="fa fa-photo uploadButton text-secondary" />
          </label>{" "}
          Change
          <label style={{ float: "left" }}>Story :</label>
          <TextField
            value={story}
            className="text-field"
            onChange={(e) => onChange(e)}
            name="story"
          />
          <label style={{ float: "left" }}>Gender :</label>
          <TextField
            value={gender}
            className="text-field"
            onChange={(e) => onChange(e)}
            name="gender"
          />
        </div>
      </div>
    );
  }
}
