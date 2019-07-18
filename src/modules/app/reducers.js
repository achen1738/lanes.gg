import { combineReducers } from "redux";
import { NAME } from "./constants";
import appReducer from "./appReducer";

const reducers = combineReducers({
  [NAME]: appReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
