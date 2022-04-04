import { AxiosResponse } from "axios";
import storageKeys from "constant/storageKeys";
import { call, put } from "redux-saga/effects";
import localStorage from "utils/localStorage";

export default function createRequestSaga(type: any, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action: any) {
    try {
      const accessToken: string = yield call(
        localStorage.getItem,
        storageKeys.accessToken
      );
      const response: AxiosResponse<unknown> = yield call(
        request,
        accessToken,
        action.payload
      );
      yield put({
        type: SUCCESS,
        payload: response ? response.data : null,
      });
    } catch (e) {
      if (e.response?.data) {
        yield put({
          type: FAILURE,
          payload: { ...e.response.data, type },
        });
      } else {
        yield put({
          type: FAILURE,
          payload: {
            message: `Network Error`,
            status: 500,
          },
        });
      }
    }
  };
}
