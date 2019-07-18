import { GET_USER_DETAILS } from './actionTypes';

const initialState = {
  matches: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS.PENDING:
      return state;
    case GET_USER_DETAILS.SUCCESS:
      return Object.assign({}, state, {
        matches: action.matches
      });
    case GET_USER_DETAILS.ERROR:
      return state;
    default:
      return state;
  }
}
