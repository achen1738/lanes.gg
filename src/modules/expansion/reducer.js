import { GET_ANALYSIS } from './actionTypes';
const initialState = {};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ANALYSIS.PENDING:
      return state;
    case GET_ANALYSIS.SUCCESS:
      return Object.assign({}, state, {
        ...action.analysis
      });
    case GET_ANALYSIS.ERROR:
      return state;
    default:
      return state;
  }
}
