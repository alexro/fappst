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

// const createRootReducer = (history) =>
//   combineReducers({
//     router: connectRouter(history),
//     form: reduxFormReducer,
//     conditionsList: conditionsListReducer,
//   });

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

// export default function configureStore(history, initialState) {
//   const store = createStore(
//     createRootReducer(history),
//     initialState,
//     composeEnhancers(
//       applyMiddleware(routerMiddleware(history), thunkMiddleware)
//       // other store enhancers if any
//     )
//   );

//   return store;
// }
