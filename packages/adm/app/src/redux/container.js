import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducer';
import composeMiddleware, { run } from './middleware';
import configureStore from './store';

const history = createBrowserHistory();

export default function WireUp({ children }) {
  const rootReducer = createRootReducer(history);
  const middleware = composeMiddleware();
  const store = configureStore(rootReducer, undefined, middleware);

  run();

  return (
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        {children}
      </ConnectedRouter>
    </Provider>
  );
}
