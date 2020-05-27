import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { rootElement } from './context';
import Main from './container';

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
