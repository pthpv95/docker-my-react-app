import React, { useState, useEffect } from "react";
const Room = ({ room }) => {
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
    </div>
  );
};

export const RoomList = props => {
  return (
    <div className="room_list">
      {props.rooms.length > 0 ? (
        props.rooms.map((item, index) => <Room room={item} key={index} />)
      ) : (
        <p>No online rooms</p>
      )}
    </div>
  );
};
