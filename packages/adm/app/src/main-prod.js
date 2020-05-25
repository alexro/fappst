import React from 'react';
import ReactDOM from 'react-dom';
import Main, { rootElement } from './main';

function main() {
  ReactDOM.render(<Main />, rootElement);
}

main();
console.log('main prod');
``
