import { call, put, takeLatest } from "redux-saga/effects";
import { SIGNIN } from "modules/redux/action/signin/interface";
import { signin } from "utils/api/signin";

export const signinRequestSaga = function* (action: any) {
  const FAILURE = `${SIGNIN}_FAILURE`;
  const SUCCESS = `${SIGNIN}_SUCCESS`;

  try {
    yield call(signin, action.payload);
    yield put({
      type: SUCCESS,
    });
  } catch (error) {
    if (error.response?.data) {
      yield put({
        type: FAILURE,
        payload: { ...error.response.data, type: SIGNIN },
      });
    } else {
      yield put({
        type: FAILURE,
        payload: {
          message: "Network Error",
          status: 500,
        },
      });
    }
  }
};

function* signinSaga() {
  yield takeLatest(SIGNIN, signinRequestSaga);
}

export default signinSaga;
