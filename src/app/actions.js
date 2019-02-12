export const getOnlineRoomChat = roomList => ({
  type: "GET_CHAT_ROOM_LIST",
  payload: roomList
});


export const updateLoadingStatus = status => ({
  type: "UPDATE_LOADING_STATUS",
  payload: status
});
