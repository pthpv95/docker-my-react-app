import React, { useState, useEffect } from "react";

export function CreateRoom(props) {
  const [field, onFieldChange] = useState({
    name: "",
    room: ""
  });

  // function onChangeRoom(value) {
  //   onFieldChange({
  //     ...field,
  //     room: value
  //   });
  // }

  // function handleSubmit() {}

  useEffect(() => {
    if (props.user && CreateRoom === undefined)
      window.location.href = "/apps/chat";
  });
  return (
    <div className="centered-form__form">
      <form>
        <div className="form-field">
          <h3>Create room chat</h3>
        </div>
        <div className="form-field">
          <label>Room name:</label>
          <input
            type="text"
            name="room"
            value={field.room}
            onChange={e =>
              onFieldChange({
                ...field,
                room: e.target.value
              })
            }
          />
        </div>
        <div className="form-field">
          <button
            onClick={e => {
              e.preventDefault();
              props.submitUserInfo(props.user.name, field.room);
              props.history.push(
                `/apps/chat/room?name=${props.user.name}&room=${field.room}`
              );
            }}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;
