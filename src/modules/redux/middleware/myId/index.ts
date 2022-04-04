import { GET_MY_ID } from "modules/redux/action/myId/interface";\
import { takeLatest } from "redux-saga/effects";
import { getMyId } from "utils/api/myId";
import createRequestSaga from "utils/saga/createRequestSaga";

export const getMyIdSaga = createRequestSaga(GET_MY_ID, getMyId);

function* myIdSaga() {
  yield takeLatest(GET_MY_ID, getMyIdSaga);
}

export default myIdSaga;
