import React from 'react';
import ReactDOM from 'react-dom';
import { rootElement } from './context';
import Main from './container';

function main() {
  ReactDOM.render(<Main />, rootElement);
}

main();
console.log('main prod');
