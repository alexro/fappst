import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { rootElement, MainContext } from './context';
import Redux from '../redux/container';
import Layout from '../modules/Layout';

function Main({ children }) {
  const [value, setValue] = useState({ current: 'sd daa dasd a' });

  value.update = (obj) => {
    console.log('kuku');
    setValue({ current: obj });
  };

  return (
    <MainContext.Provider value={value}>
      <Redux>
        <Layout />
      </Redux>
    </MainContext.Provider>
  );
}

export default Main;
