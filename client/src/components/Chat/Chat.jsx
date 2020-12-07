import React, { Component } from "react";
import "./Chat.css";
import ChatSide from "./ChatSide";
import ChatRouter from "./ChatRouter";

class Chat extends Component {
  render() {
    const { user } = this.props;
    return (
      <div style={{ margin: "10px" }}>
        <div className="chat p-0 align-baseline">
          <ChatSide friends={user.friends} />
          <ChatRouter user={user} />
        </div>
      </div>
    );
  }
}

export default Chat;
