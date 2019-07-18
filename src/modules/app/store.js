import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

/*
 * This wires up redux with our reducers
 */
export default function configureStore(initialState) {
  //   The DEVTOOLS stuff will enable the redux devtools in Chrome
  const composeEnhancers =
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(reducer, initialState, enhancer);

  sagaMiddleware.run(saga);

  return store;
}
