import { GET_VIDEO_URL } from "modules/redux/action/videoUrl/interface";
import { getVideoUrl } from "utils/api/camera";
import createRequestSaga from "utils/saga/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

export const getVideoUrlRequestSaga = createRequestSaga(GET_VIDEO_URL, getVideoUrl);

function* videoUrlSaga() {
  yield takeLatest(GET_VIDEO_URL, getVideoUrlRequestSaga);
}

export default videoUrlSaga;
