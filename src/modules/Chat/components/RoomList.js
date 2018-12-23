import React, { useState, useEffect } from "react";

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
