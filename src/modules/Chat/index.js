import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RoomChat } from "./components/RoomChat";
import CreateRoom from "./components/CreateRoom";
import LoginContainer from "./components/Login";

export default () => {
  return (
    <div>
      <Route exact path={"/chat"} component={LoginContainer} />
      <Route exact path={"/chat/join"} component={CreateRoom} />
      <Route exact path={"/chat/room"} component={RoomChat} />
    </div>
  );
};
