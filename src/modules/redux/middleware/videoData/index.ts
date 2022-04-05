import {
  POST_ANSWER_VIDEO_DATA,
  POST_QUESTION_VIDEO_DATA,
} from "modules/redux/action/videoData/interface";
import { postQuestionVideoData, postAnswerVideoData } from "utils/api/questionVideoData";
import createRequestSaga from "utils/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

export const postQuestionVideoDataRequestSaga = createRequestSaga(
  POST_QUESTION_VIDEO_DATA,
  postQuestionVideoData
);

export const postAnswerVideoDataRequestSaga = createRequestSaga(
  POST_ANSWER_VIDEO_DATA,
  postAnswerVideoData
);

function* questionVideoDataSaga() {
  yield takeLatest(POST_QUESTION_VIDEO_DATA, postQuestionVideoDataRequestSaga);
}

function* answerVideoDataSaga() {
  yield takeLatest(POST_ANSWER_VIDEO_DATA, postAnswerVideoDataRequestSaga);
}

export { questionVideoDataSaga, answerVideoDataSaga };
