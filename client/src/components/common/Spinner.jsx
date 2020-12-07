import React, { Component } from "react";
import spinner from "../../images/spinner.gif";

class Spinner extends Component {
  render() {
    return (
      <div className="uploading">
        <img src={spinner} alt="" />
      </div>
    );
  }
}

export default Spinner;
