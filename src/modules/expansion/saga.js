import { put, takeEvery } from 'redux-saga/effects';

import { GET_ANALYSIS } from './actionTypes';
// eslint-disable-next-line
import { getAnalysisAPI } from '../../services/lanesAPI';
import { SingleExpansion } from '../../mock/correct';

export function* saga() {
  yield takeEvery(GET_ANALYSIS.ACTION, getAnalysis);
}

/**
 * Delays 1 second before incrementing the counter
 * @param {*} action
 */
export function* getAnalysis(action) {
  try {
    yield put({ type: GET_ANALYSIS.PENDING });
    // const analysis = yield getAnalysisAPI(action.gameId);

    const analysis = {
      [action.gameId]: {
        matches: SingleExpansion
      }
    };
    yield put({ type: GET_ANALYSIS.SUCCESS, analysis });
  } catch (error) {
    yield put({
      type: GET_ANALYSIS.ERROR
    });
  }
}
