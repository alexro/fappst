import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import { Provider, ReactReduxContext } from 'react-redux';
// import { Route } from 'react-router';
// import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
// import configureStore from './redux/store';

// import server from './api';
// import App from './App.old';

// const history = createBrowserHistory();
// const store = configureStore(history);

import '../public/assets/css/main.scss'

const rootElement = document.getElementById('root');

function render() {
  ReactDOM.render(
    // <AppContainer>
    //   <React.StrictMode>
    //     <Provider store={store} context={ReactReduxContext}>
    //       <ConnectedRouter history={history} context={ReactReduxContext}>
    //         <Route path="/">
    //           <App />
    //         </Route>
    //       </ConnectedRouter>
    //     </Provider>
    //   </React.StrictMode>
    // </AppContainer>,
    <div className="relative overflow-hidden mb-8">
      <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4">
        <div className="max-w-sm mx-auto"></div>
      </div>
      <div className="rounded-b-lg p-4 bg-gray-800">
        <h1>ho ho</h1>
      </div>
    </div>,
    rootElement
  );
}

render();
