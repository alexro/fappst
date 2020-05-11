import React from "react";
import { render } from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./modules/store";
import App from "./App";

const history = createBrowserHistory();
const store = configureStore(history);
const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <Route path="/">
          <App />
        </Route>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);

if (module.hot) {
  console.log("ho ho hot");
  console.log("hot hot hot");
  console.log("hot hot hot");
}
console.log("ho ho", API_KEY);
