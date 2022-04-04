import { GET_PROFILE } from "modules/redux/action/profile/interface";
import { takeLatest } from "redux-saga/effects";
import { getProfile } from "utils/api/profile";
import createRequestSaga from "utils/saga/createRequestSaga";

export const getProfileSaga = createRequestSaga(GET_PROFILE, getProfile);

function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
}

export default profileSaga;
