import { NAME } from './constants';

export const getMatches = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.matches;
};

export const getDDragon = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.ddragon;
};

export const getSummoner = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return {};
  }

  return appState.summoner;
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
