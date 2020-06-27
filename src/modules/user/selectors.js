import { NAME } from './constants';

export const getGames = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.games;
};

export const getUserMatch = (state, gameId) => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }
  return appState.userMatches[gameId];
};

export const getDisplayMatches = (state, gameId) => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.displayMatches[gameId];
};

export const getMatches = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.matches;
};

export const getChampions = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.champions;
};

export const getSummonerSpells = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }
  return appState.summonerSpells;
};

export const getRunes = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.runes;
};

export const getItems = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.items;
};
