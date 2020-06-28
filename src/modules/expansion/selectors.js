import { NAME, APP } from './constants';

export const getMatch = (state, gameId) => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState || !appState[gameId]) {
    return [];
  }
  return appState[gameId].matches;
};

export const getTimeline = (state, gameId) => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState[gameId].timeline;
};

export const getDDragon = state => {
  const moduleName = APP;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.ddragon;
};

export const getSummonerSpells = state => {
  const moduleName = APP;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.summonerSpells;
};

export const getRunes = state => {
  const moduleName = APP;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.runes;
};

export const getItems = state => {
  const moduleName = APP;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.items;
};

export const getChampions = state => {
  const moduleName = APP;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.champions;
};
