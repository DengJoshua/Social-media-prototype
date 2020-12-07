import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="p-1">
        <input
          type="text"
          name=""
          placeholder="Search Friends... "
          className="chat-search"
        />
        <br />
      </div>
    );
  }
}

export default Search;
