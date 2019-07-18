import { put, takeEvery, delay } from "redux-saga/effects";

import { INCREMENT_ASYNC } from "./actionTypes";

export function* saga() {
  yield takeEvery(INCREMENT_ASYNC.ACTION, incrementAsync);
}

/**
 * Delays 1 second before incrementing the counter
 * @param {*} action
 */
export function* incrementAsync(action) {
  try {
    yield put({ type: INCREMENT_ASYNC.PENDING, background: action.background });
    yield delay(1000);
    yield put({ type: INCREMENT_ASYNC.SUCCESS, background: action.background });
  } catch (error) {
    yield put({
      type: INCREMENT_ASYNC.ERROR,
      background: action.background,
      error
    });
  }
}
