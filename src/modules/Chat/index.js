import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { RoomChat } from "./components/RoomChat";
import { Login } from "./components/Login";
import RoomListContainer from "./components/RoomList";

export default () => {
  return (
    <div>
      <Route exact path={"/apps/chat"} component={RoomListContainer} />
      <Route exact path={"/apps/chat/join"} component={Login} />
      <Route exact path={"/apps/chat/room"} component={RoomChat} />
    </div>
  );
};
