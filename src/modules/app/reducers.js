import { combineReducers } from 'redux';
import { NAME } from '../user/constants';
import appReducer from '../user/appReducer';

const reducers = combineReducers({
  [NAME]: appReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
