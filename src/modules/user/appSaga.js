import { put, takeEvery, delay } from 'redux-saga/effects';

import { GET_USER_DETAILS } from './actionTypes';
import { getMatchesAPI } from '../../services/lanesAPI';
import {} from 'q';

export function* saga() {
  yield takeEvery(GET_USER_DETAILS.ACTION, getUserDetails);
}

/**
 * Delays 1 second before incrementing the counter
 * @param {*} action
 */
export function* getUserDetails(action) {
  try {
    yield put({ type: GET_USER_DETAILS.PENDING });
    // Make multiple API calls here
    delay(150);
    const matches = getMatchesAPI(action.username);
    yield put({ type: GET_USER_DETAILS.SUCCESS, matches });
  } catch (error) {
    yield put({
      type: GET_USER_DETAILS.ERROR
    });
  }
}
