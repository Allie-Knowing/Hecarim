import { all } from 'redux-saga/effects';
import feedSaga from './feed';

export default function* rootSaga() {
    yield all([
        feedSaga(),
    ]);
}