import { POST_VIDEO_UPLOAD } from "modules/redux/action/camera/interface";
import { postVideoApi } from "utils/api/camera";
import createRequestSaga from "utils/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

export const postVideoRequestSaga = createRequestSaga(POST_VIDEO_UPLOAD, postVideoApi);

function* cameraSaga() {
  yield takeLatest(POST_VIDEO_UPLOAD, postVideoApi);
}

export default cameraSaga;
