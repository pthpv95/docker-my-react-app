import { put, takeLatest, all } from "redux-saga/effects";

function* updateChatRoom(action) {
  console.log(action.payload);

  yield put({
    type: "UPDATE_CHAT_ROOM_LIST",
    payload: action.payload
  });
}
function* mySaga() {
  yield all([takeLatest("GET_CHAT_ROOM_LIST", updateChatRoom)]);
}

export default mySaga;
