import { DELETE_TEXT_ANSWER, GET_TEXT_ANSWER_LIST, POST_TEXT_ANSWER } from "modules/redux/action/textAnswer/interface";
import { takeLatest } from "redux-saga/effects";
import { deleteTextAnswerApi, getTextAnswerApi, postTextAnswerApi } from "utils/api/textAnswer";
import createRequestSaga from "utils/saga/createRequestSaga";

export const getTextAnswerListRequestSaga = createRequestSaga(GET_TEXT_ANSWER_LIST, getTextAnswerApi);
export const postTextAnswerRequestSaga = createRequestSaga(POST_TEXT_ANSWER, postTextAnswerApi);
export const deleteTextAnswerRequestSaga = createRequestSaga(DELETE_TEXT_ANSWER, deleteTextAnswerApi);

function* textAnswerSaga() {
  yield takeLatest(GET_TEXT_ANSWER_LIST, getTextAnswerListRequestSaga);
  yield takeLatest(POST_TEXT_ANSWER, postTextAnswerRequestSaga);
  yield takeLatest(DELETE_TEXT_ANSWER, deleteTextAnswerRequestSaga);
}

export default textAnswerSaga;