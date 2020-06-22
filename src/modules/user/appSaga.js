import { put, takeEvery, delay } from 'redux-saga/effects';

import { GET_USER_DETAILS } from './actionTypes';
import { getFakeMatchesApi, getSummonerAPI } from '../../services/lanesAPI';

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
    // const realMatches = yield getSummonerAPI('opsdad');
    const matches = getFakeMatchesApi(action.username);
    yield put({ type: GET_USER_DETAILS.SUCCESS, matches });
  } catch (error) {
    yield put({
      type: GET_USER_DETAILS.ERROR
    });
  }
}
