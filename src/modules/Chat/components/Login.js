import React, { useState, useEffect } from "react";

export function Login(props) {
  console.log(props)
  
  const [field, onFieldChange] = useState({
    name: "",
    room: ""
  });

  function onChangeRoom(value) {
    onFieldChange({
      ...field,
      room: value
    });
  }

  function handleSubmit() {
    props.history.push(`/chat/room?name=${field.name}&room=${field.room}`);
  }

  return (
    <div className="centered-form__form">
      <form>
        <div className="form-field">
          <h3>Join a chat</h3>
        </div>
        <div className="form-field">
          <label>Display name:</label>
          <input
            type="text"
            name="name"
            autoFocus
            value={field.name}
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
          <button onClick={handleSubmit}>Join</button>
        </div>
      </form>
    </div>
  );
}
