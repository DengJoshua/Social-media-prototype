import React, { Component } from "react";
import LeftBody from "./LeftBody";
import RightBody from "./RightBody";
import "./MainBody.css";

class MainBody extends Component {
  render() {
    const { user, posts } = this.props;
    return (
      <React.Fragment>
        <div className="main-body rounded">
          <RightBody user={user} posts={posts} />
          <LeftBody user={user} />
        </div>
      </React.Fragment>
    );
  }
}

export default MainBody;
