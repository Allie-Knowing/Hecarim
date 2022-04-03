import { all } from "redux-saga/effects";
import feedSaga from "./feed";
import signinSaga from "./signin";

export default function* rootSaga() {
  yield all([feedSaga(), signinSaga()]);
}
