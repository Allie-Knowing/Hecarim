import {
  GET_PROFILE,
  GET_PROFILE_QUESTION_LIST,
} from "modules/redux/action/profile/interface";
import { takeLatest } from "redux-saga/effects";
import { getProfile, getProfilQuestionList } from "utils/api/profile";
import createRequestSaga from "utils/saga/createRequestSaga";

export const getProfileSaga = createRequestSaga(GET_PROFILE, getProfile);
export const getProfileQuestionListSage = createRequestSaga(
  GET_PROFILE_QUESTION_LIST,
  getProfilQuestionList
);

function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
  yield takeLatest(GET_PROFILE_QUESTION_LIST, getProfileQuestionListSage);
}

export default profileSaga;
