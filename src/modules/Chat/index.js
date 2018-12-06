import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { makeGetChatRooms } from "./selector";
import { createSelector } from "reselect";
import { RoomList } from "./components/RoomList";
import { RoomChat } from "./components/RoomChat";
import { Login } from "./components/Login";

export default () => {
  const mapStateToProps = createSelector(
    makeGetChatRooms(),
    rooms => ({
      rooms
    })
  );

  const RoomListContainer = connect(mapStateToProps)(RoomList);
  return (
    <div>
      <Route exact path={"/chat"} component={RoomListContainer} />
      <Route exact path={"/chat/join"} component={Login} />
      <Route exact path={"/chat/room"} component={RoomChat} />
    </div>
  );
};
