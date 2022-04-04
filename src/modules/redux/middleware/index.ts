import { all } from "redux-saga/effects";
import likeSaga from "./like";
import myIdSaga from "./myId";
import profileSaga from "./profile";
import signinSaga from "./signin";
import textAnswerSaga from "./textAnswer";
import cameraSaga from "./camera";
import answer from "./answer";

export default function* rootSaga() {
  yield all([answer(), signinSaga(), likeSaga(), profileSaga(), myIdSaga(), textAnswerSaga(), cameraSaga()]);
}
