import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "utils/saga/createRequestSaga";
import { GET_AUTO_COMPLETE } from "modules/redux/action/search/interface";
import { getSearchAutoCompleteApi } from "utils/api/search";

export const getSearchAutoCompleteRequestSaga = createRequestSaga(GET_AUTO_COMPLETE, getSearchAutoCompleteApi);

function* searchSaga() {
  yield takeLatest(GET_AUTO_COMPLETE, getSearchAutoCompleteRequestSaga);
}

export default searchSaga; 