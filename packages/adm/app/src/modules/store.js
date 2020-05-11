import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import conditionsListReducer from "./conditionsList/conditionsListSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    conditionsList: conditionsListReducer,
  });

export default function configureStore(history, initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
      )
    )
  );

  return store;
}
