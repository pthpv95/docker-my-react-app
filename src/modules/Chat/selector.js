import { createSelector } from "reselect";

const selectChat = state => state.get("chat");

const makeGetChatRooms = () =>
  createSelector(
    selectChat,
    chat => ({
      rooms: chat.get("rooms"),
      user: chat.get("user")
    })
  );

const makeGetUser = () =>
  createSelector(
    selectChat,
    chat => chat.get("user")
  );

export { makeGetChatRooms, makeGetUser, selectChat };
