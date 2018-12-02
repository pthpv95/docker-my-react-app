import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getQueryStringParams, formatTime } from "../../utils";

const url =
  process.env.NODE_ENV !== "production"
    ? "https://immense-refuge-88531.herokuapp.com/"
    : "http://localhost:3000";

const socket = io(url);

function JoinRoom(props) {
  const [field, onFieldChange] = useState({
    name: "",
    room: ""
  });

  function handleSubmit() {
    props.history.push(`/chat/room?name=${field.name}&room=${field.room}`);
  }

  return (
    <div className="centered-form__form">
      <div className="form-field">
        <h3>Join a chat</h3>
      </div>
      <div className="form-field">
        <label>Display name:</label>
        <input
          type="text"
          name="name"
          autoFocus
          value={field["name"].value}
          onChange={e =>
            onFieldChange({
              ...field,
              name: e.target.value
            })
          }
        />
      </div>
      <div className="form-field">
        <label>Room name:</label>
        <input
          type="text"
          name="room"
          value={field["room"].value}
          onChange={e =>
            onFieldChange({
              ...field,
              room: e.target.value
            })
          }
        />
      </div>
      <div className="form-field">
        <button onClick={handleSubmit}>Join</button>
      </div>
    </div>
  );
}

function Users({ users }) {
  return (
    <div className="chat__sidebar">
      <h3>People</h3>
      <div id="users">
        <ol>
          {users.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Message({ messages }) {
  return (
    <div>
      {messages.length > 0 &&
        messages.map((message, index) => (
          <li key={index} className="message">
            <div className="message__title">
              <h4>{message.from}</h4>
              <span>{formatTime(message.createdAt)}</span>
            </div>
            <div className="message_body">
              <p>{message.text}</p>
            </div>
          </li>
        ))}
    </div>
  );
}

function RoomChat(props) {
  const [messages, updateMessage] = useState([]);
  const [users, updateUsers] = useState([]);
  const [text, updateText] = useState("");

  useEffect(() => {
    const params = getQueryStringParams(props.location.search);
    socket.emit("join", params, err => {
      if (err) {
        window.location.href = "/chat";
      }
    });
    socket.on("newMessage", result => {
      let temp = messages;
      temp.push(result);
      updateMessage(temp);
    });

    socket.on("updateUserList", usersList => {
      updateUsers(usersList);
    });
  }, messages || users); // Only update state when messages or users have been changed

  return (
    <div className="chat">
      <Users users={users} />
      <div className="chat__main">
        <ol id="messages" className="chat__messages">
          <Message messages={messages} />
        </ol>
        <div className="chat__footer">
          <form id="message-form">
            <input
              name="message"
              type="text"
              placeholder="Message"
              autoFocus
              autoComplete="off"
              onChange={e => updateText(e.target.value)}
              value={text}
            />
            <button
              onClick={e => {
                e.preventDefault();
                socket.emit(
                  "createMessage",
                  {
                    from: "user",
                    text: text
                  },
                  () => updateText("")
                );
              }}
            >
              Send
            </button>
          </form>
          <button id="send-location">Send location</button>
        </div>
      </div>
    </div>
  );
}

export default () => {
  return (
    <div>
      <Route exact path={"/chat"} component={JoinRoom} />
      <Route path={"/chat/room"} component={RoomChat} />
    </div>
  );
};
