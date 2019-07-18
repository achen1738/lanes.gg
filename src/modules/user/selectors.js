import { NAME } from './constants';

export const getMatches = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.matches;
};
