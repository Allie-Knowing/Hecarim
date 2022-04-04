import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "utils/saga/createRequestSaga";
import { GET_VIDEO_ANSWER_LIST } from "modules/redux/action/answer/interface";
import { getVideoAnswerListApi } from "utils/api/answer";

export const getVideoAnswerListRequestSaga = createRequestSaga(GET_VIDEO_ANSWER_LIST, getVideoAnswerListApi);

function* answerSaga() {
  yield takeLatest(GET_VIDEO_ANSWER_LIST, getVideoAnswerListRequestSaga);
}

export default answerSaga;
