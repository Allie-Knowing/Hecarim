import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "utils/saga/createRequestSaga";
import { GET_TITLE_SEARCH } from "modules/redux/action/search/interface";
import { getSearchTitleResponseApi } from "utils/api/search";

export const getSearchTitleResponseRequestSaga = createRequestSaga(GET_TITLE_SEARCH, getSearchTitleResponseApi);

function* searchSaga() {
  yield takeLatest(GET_TITLE_SEARCH, getSearchTitleResponseRequestSaga);
}

export default searchSaga; 