import { all } from "redux-saga/effects";
import feedSaga from "./feed";
import likeSaga from "./like";
import myIdSaga from "./myId";
import profileSaga from "./profile";
import signinSaga from "./signin";
import textAnswerSaga from "./textAnswer";
import cameraSaga from "./camera";

export default function* rootSaga() {
  yield all([feedSaga(), signinSaga(), likeSaga(), profileSaga(), myIdSaga(), textAnswerSaga(), cameraSaga()]);
}
