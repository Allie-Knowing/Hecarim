import { all } from "redux-saga/effects";
import feedSaga from "./feed";
import likeSaga from "./like";
import signinSaga from "./signin";
import cameraSaga from "./camera";

export default function* rootSaga() {
  yield all([feedSaga(), signinSaga(), likeSaga(), cameraSaga()]);
}
