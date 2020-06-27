import { GET_ANALYSIS } from './actionTypes';

export const getAnalysisAction = gameId => {
  return {
    type: GET_ANALYSIS.ACTION,
    gameId
  };
};
