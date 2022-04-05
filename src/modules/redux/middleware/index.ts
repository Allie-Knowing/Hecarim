import { all } from "redux-saga/effects";
import likeSaga from "./like";
import myIdSaga from "./myId";
import profileSaga from "./profile";
import signinSaga from "./signin";
import textAnswerSaga from "./textAnswer";
import videoUrlSaga from "./videoUrl";
import answer from "./answer";
import { questionVideoDataSaga, answerVideoDataSaga } from "./videoData";

export default function* rootSaga() {
  yield all([
    answer(),
    signinSaga(),
    likeSaga(),
    profileSaga(),
    myIdSaga(),
    textAnswerSaga(),
    videoUrlSaga(),
    questionVideoDataSaga(),
    answerVideoDataSaga(),
  ]);
}
