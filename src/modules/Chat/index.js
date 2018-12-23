import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { makeGetChatRooms } from "./selector";
import { createSelector } from "reselect";
import { RoomList } from "./components/RoomList";
import { RoomChat } from "./components/RoomChat";
import { Login } from "./components/Login";
import { submitUserInfo } from "./actions";

const mapStateToProps = createSelector(
  makeGetChatRooms(),
  chat => ({
    rooms: chat.rooms,
    user: chat.user
  })
);

const mapDispatchToProps = dispatch => ({
  submitUserInfo: (name, room) => dispatch(submitUserInfo(name, room))
});

const RoomListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default () => {
  return (
    <div>
      <Route exact path={"/apps/chat"} component={RoomListContainer} />
      <Route exact path={"/apps/chat/join"} component={Login} />
      <Route exact path={"/apps/chat/room"} component={RoomChat} />
    </div>
  );
};
