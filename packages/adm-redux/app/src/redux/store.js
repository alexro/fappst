import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as reduxFormReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import logger from '../middleware/logger';
import conditionsListReducer from '../modules/conditionsList/conditionsListSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    conditionsList: conditionsListReducer,
  });

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default function configureStore(history, initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunkMiddleware, logger, sagaMiddleware)
      // other store enhancers if any
    )
  );

  //sagaMiddleware.run(rootSaga);

  return store;
}
