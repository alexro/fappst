import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

import { MainContext } from '../../main/main';

function Layout({ children }) {
  const mainContext = useContext(MainContext);
  setTimeout(() => {
    mainContext.update(`${new Date()}`);
  }, 2000);
  return (
    <Route path="/">
      <p> kdsfk fkds :: {mainContext.current}</p>
    </Route>
  );
}

export default Layout;
