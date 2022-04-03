import { DELETE_LIKE, POST_LIKE } from "modules/redux/action/like/interface";
import { takeLatest } from "redux-saga/effects";
import { deleteLikeApi, postLikeApi } from "utils/api/like";
import createRequestSaga from "utils/saga/createRequestSaga";

export const postLikeRequestSaga = createRequestSaga(POST_LIKE, postLikeApi);
export const deleteLikeRequestSaga = createRequestSaga(
  DELETE_LIKE,
  deleteLikeApi
);

function* likeSaga() {
  yield takeLatest(POST_LIKE, postLikeRequestSaga);
  yield takeLatest(DELETE_LIKE, deleteLikeRequestSaga);
}

export default likeSaga;
