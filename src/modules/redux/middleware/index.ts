import { all } from "redux-saga/effects";
import signinSaga from "./signin";

export default function* rootSaga() {
  yield all([signinSaga()]);
}
