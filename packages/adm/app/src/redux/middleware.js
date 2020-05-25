import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import rootSaga from './saga';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const sagaMiddleware = createSagaMiddleware();

export default function composeMiddleware(history) {
  return composeEnhancers(
    applyMiddleware(routerMiddleware(history), thunkMiddleware, sagaMiddleware)
    // other store enhancers if any
  );
}

export function run() {
  sagaMiddleware.run(rootSaga);
}
