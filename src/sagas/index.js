import { spawn } from "redux-saga/effects";
import chatSagas from "../modules/Chat/sagas";

export default function* rootSaga() {
  yield [spawn(chatSagas)];
}
