import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader"; /* react-hot-loader v3 */
import { Provider, ReactReduxContext } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./modules/store";
import App from "./App";

const history = createBrowserHistory();
const store = configureStore(history);
const rootElement = document.getElementById("root");

const render = () =>
  ReactDOM.render(
    <AppContainer>
      <React.StrictMode>
        <Provider store={store} context={ReactReduxContext}>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            <Route path="/">
              <App />
            </Route>
          </ConnectedRouter>
        </Provider>
      </React.StrictMode>
    </AppContainer>,
    rootElement
  );

render();

console.log("ho ho", API_KEY);

if (module.hot) {
  module.hot.accept("./App", () => {
    /* For Webpack 2.x
       Need to disable babel ES2015 modules transformation in .babelrc
       presets: [
         ["es2015", { "modules": false }]
       ]
    */
    render();
  });
}
