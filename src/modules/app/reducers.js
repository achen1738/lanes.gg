import { combineReducers } from 'redux';
import { NAME } from '../user/constants';
import appReducer from '../user/appReducer';
import { constants as EXPANSION, reducer as expansionReducer } from '../expansion';
const reducers = combineReducers({
  [NAME]: appReducer,
  [EXPANSION.NAME]: expansionReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
