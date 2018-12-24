import React, { useState, useEffect, useContext } from "react";
import SocketContext from "../../../socket-context";
import { getOnlineRoomChat } from "../../../app/actions";
import { connect } from "react-redux";
import { makeGetChatRooms } from "../selector";
import { createSelector } from "reselect";
import { submitUserInfo } from "../actions";

const Room = ({ room, onJoinRoom }) => {
  return (
    <div className="cellContainer">
      <div className="form-field">
        <label>Room name:</label>
        <h3>{room.name}</h3>
      </div>
      <div className="form-field">
        <label>Online users:</label>
        <h3>{room.users.length}</h3>
      </div>
      <button onClick={onJoinRoom}>Join</button>
    </div>
  );
};

export const RoomList = props => {
  function handleJoinRoom(room) {
    props.history.push(`/apps/chat/join`);
    // props.submitUserInfo(room.name, "");
  }

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("updateRoomList", roomList => {
      props.getOnlineRoomChat(roomList);
    });
  });

  return (
    <div className="room_list">
      {props.rooms.length > 0 ? (
        props.rooms.map((item, index) => (
          <Room
            room={item}
            key={index}
            onJoinRoom={e => handleJoinRoom(item)}
          />
        ))
      ) : (
        <div>
          <p>No online rooms</p>
          <button
            onClick={e => {
              props.history.push("/apps/chat/join");
            }}
          >
            Create room:
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createSelector(
  makeGetChatRooms(),
  chat => ({
    rooms: chat.rooms,
    user: chat.user
  })
);

const mapDispatchToProps = dispatch => ({
  submitUserInfo: (name, room) => dispatch(submitUserInfo(name, room)),
  getOnlineRoomChat: roomList => dispatch(getOnlineRoomChat(roomList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);
