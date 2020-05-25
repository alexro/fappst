import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore  from './store';

// import server from './api';

const history = createBrowserHistory();

export default function ReduxSetup({ children }) {
  const store = configureStore(history);
  return (
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        {children}
      </ConnectedRouter>
    </Provider>
  );
}
