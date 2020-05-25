import { createStore } from 'redux';
import createRootReducer from './reducer';

export default function configureStore(history, initialState) {
  const store = createStore(
    createRootReducer(history)
    // initialState,
    // composeEnhancers(
    //   applyMiddleware(routerMiddleware(history), thunkMiddleware, logger, sagaMiddleware)
    //   // other store enhancers if any
    // )
  );

  //sagaMiddleware.run(rootSaga);

  return store;
}
