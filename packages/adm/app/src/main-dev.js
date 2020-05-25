import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main, { rootElement } from './main';

function main() {
  ReactDOM.render(
    <AppContainer>
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    </AppContainer>,
    rootElement
  );
}

main();
console.log('main dev');
