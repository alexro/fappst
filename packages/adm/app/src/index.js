import React from "react";
import ReactDOM from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { render } from "react-dom";
import { Route, Switch } from "react-router"; // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./modules/store";
import App from "./App";

const history = createBrowserHistory();

const store = configureStore(history /* provide initial state if any */);

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route render={() => <div>Miss</div>} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);

console.log("ho ho", API_KEY);
