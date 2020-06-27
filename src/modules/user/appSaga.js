import { put, takeEvery } from 'redux-saga/effects';

import { GET_USER_DETAILS, GET_DDRAGON } from './actionTypes';
// eslint-disable-next-line
import { getFakeMatchesApi, getAllInfo, getDDragonAPI } from '../../services/lanesAPI';

export function* saga() {
  yield takeEvery(GET_USER_DETAILS.ACTION, getUserDetails);
  yield takeEvery(GET_DDRAGON.ACTION, getDDragon);
}

export function* getDDragon() {
  try {
    yield put({ type: GET_DDRAGON.PENDING });

    const res = yield getDDragonAPI();
    const data = res.data.data;
    const unflattened = {
      champions: unflattenKeyHelper(data.getChampions),
      items: unflattenIDHelper(data.getItems),
      summonerSpells: unflattenKeyHelper(data.getSummonerSpells),
      profileIcons: unflattenIDHelper(data.getProfileIcons)
    };
    console.log(unflattened);
    yield put({
      type: GET_DDRAGON.SUCCESS,
      ...unflattened
    });
  } catch (error) {
    yield put({
      type: GET_DDRAGON.ERROR
    });
  }
}

export function* getUserDetails(action) {
  try {
    yield put({ type: GET_USER_DETAILS.PENDING });

    // const items = yield kayn.DDragon.Item.list();
    // console.log(items);

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

const unflattenIDHelper = array => {
  let unflattenObj = {};
  array.forEach(obj => {
    unflattenObj[obj.id] = obj;
  });
  return unflattenObj;
};

const unflattenKeyHelper = array => {
  let unflattenObj = {};
  array.forEach(obj => {
    unflattenObj[obj._key] = obj;
  });
  return unflattenObj;
};
