import { spawn } from "redux-saga/effects";
import chatSagas from "../modules/Chat/sagas";
import postSaga from "../modules/Posts/sagas";

export default function* rootSaga() {
  yield [spawn(chatSagas), spawn(postSaga)];
}
