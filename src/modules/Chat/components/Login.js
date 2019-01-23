import React, { useEffect, useContext } from "react";
import SocketContext from "../../../socket-context";
import { getOnlineRoomChat } from "../../../app/actions";
import { connect } from "react-redux";
import { makeGetChatRooms } from "../selector";
import { createSelector } from "reselect";
import { submitUserInfo } from "../actions";
import { Formik, Field, Form } from "formik";
import { CreateRoom } from "./CreateRoom";

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

export const Login = props => {
  function handleJoinRoom(room) {
    props.submitUserInfo(room, props.user.name);
    props.history.push(
      `/apps/chat/room?name=${props.user.name}&room=${room.name}`
    );
  }

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("updateRoomList", roomList => {
      props.getOnlineRoomChat(roomList);
    });
  });

  return (
    <div className="room_list">
      {props.user.name ? (
        <div>
          <RoomList handleJoinRoom={handleJoinRoom} rooms={props.rooms} />
          <CreateRoom {...props} />
        </div>
      ) : (
        <Formik
          initialValues={{ name: "" }}
          onSubmit={values => {
            props.submitUserInfo(values.name, "");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="centered-form__form">
                <h3>Login</h3>
                <div className="form-field">
                  <label>Name:</label>
                  <Field type="text" name="name" />
                </div>
                <div className="form-field">
                  <button disabled={isSubmitting}>Join</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

const RoomList = ({ rooms, handleJoinRoom }) => {
  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map((item, index) => (
          <Room
            room={item}
            key={index}
            onJoinRoom={e => handleJoinRoom(item)}
          />
        ))
      ) : (
        <div>
          <p>No online rooms</p>
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
)(Login);
