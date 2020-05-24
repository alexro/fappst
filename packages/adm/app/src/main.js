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
    <h1>ho ho</h1>,
    rootElement
  );
}

render();
