import { createSelector } from "reselect";

const selectChat = state => state.get("chat");

const makeGetChatRooms = () =>
  createSelector(
    selectChat,
    chat => chat.get("rooms")
  );

export { makeGetChatRooms };
