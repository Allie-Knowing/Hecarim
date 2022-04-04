import { all } from "redux-saga/effects";
import feedSaga from "./answer";
import signinSaga from "./signin";

export default function* rootSaga() {
  yield all([feedSaga(), signinSaga()]);
}
