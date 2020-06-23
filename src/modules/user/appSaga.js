import { put, takeEvery } from 'redux-saga/effects';

import { GET_USER_DETAILS } from './actionTypes';
// eslint-disable-next-line
import { getFakeMatchesApi, getAllInfo } from '../../services/lanesAPI';

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

    // const realMatches = yield getAllInfo('born to kill 200', 10);
    // let mappedMatches = {};
    // const data = realMatches.data.data.summoner;
    // const displayMatches = data.getDisplayMatches;
    // for (let i = 0; i < 10 * 10; i++) {
    //   let match = displayMatches[i];
    //   if (i % 10 === 0) mappedMatches[match.gameId] = [];
    //   mappedMatches[match.gameId].push(match);
    // }
    // // eslint-disable-next-line
    // let formattedObj = {
    //   leagues: data.getLeagues,
    //   displayMatches: mappedMatches,
    //   games: data.getGames,
    //   userMatches: data.getUserMatches,
    //   summoner: {
    //     profileIconId: data.profileIconId,
    //     summonerLevel: data.summonerLevel,
    //     summonerName: data.summonerName
    //   }
    // };

    // console.log(JSON.stringify(formattedObj));
    const matches = getFakeMatchesApi(action.username);
    yield put({ type: GET_USER_DETAILS.SUCCESS, matches });
  } catch (error) {
    yield put({
      type: GET_USER_DETAILS.ERROR
    });
  }
}
