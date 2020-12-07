import React, { useState, useEffect } from "react";
import Messages from "../Messages/Messages";
import { getUserProps } from "../../services/userService";
import {
  getMessages,
  SendText,
  connectsocket,
} from "../../services/friendsService";
import SendMessage from "../Messages/sendMessage";
import { Loader } from "rsuite";
import io from "socket.io-client";

let socket;
const ENDPOINT = "localhost:5000";

const ChatMain = ({ match, user }) => {
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const friendId = match.params.id;

  // get current friend and connect socket io
  useEffect(() => {
    // get friend'd data
    async function fetchData() {
      const { data: friend } = await getUserProps(friendId);
      const { data: messages } = await getMessages(user._id, friendId);
      setMessages(messages);
      setFriend(friend);
      setIsLoading(false);
      await connectsocket(user._id);
    }
    fetchData();

    // connect socket io
    socket = io(ENDPOINT);
    let name = user.username;
    let id = user._id;

    // disconnect socket io
    return () => {
      socket.emit("disconnect", { id, name: name });

      socket.off();
    };
  }, [friendId, user._id, user.username]);

  // send message in real time
  useEffect(() => {
    socket.on("message", (text) => {
      if (text.from === friendId) {
        setMessages([...messages, text]);
      }
    });
  }, [friendId, messages]);

  // send messages and save them in database
  const sendMessage = async () => {
    await SendText(user._id, friend._id, message);
    const { data } = await getMessages(user._id, friend._id);
    setMessages(data);
    setMessage("");
    const form = document.getElementById("msg");
    form.value = "";
    const chatmsgs = document.querySelector(".chat-messages");
    chatmsgs.scrollTop = chatmsgs.scrollHeight;
  };

  return isLoading ? (
    <Loader size="md" center />
  ) : (
    <div>
      <header className="chat-header">
        <img src={friend.profile.profilePic} alt={friend.username} />
        <p className="username ml-2">{friend.username}</p>
      </header>
      <Messages messages={messages} user={user} friend={friend.username} />
      <SendMessage
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

export default ChatMain;
