
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import conditionsListReducer from "./conditionsList/conditionsListSlice";


const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    conditionsList: conditionsListReducer,
  });

export default function configureStore(history, preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history) // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  return store;
}
