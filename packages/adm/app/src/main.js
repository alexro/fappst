import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import WireUp from './redux/wireup';
import Layout from './modules/Layout';

export const modalsElement = document.getElementById('modals');
export const rootElement = document.getElementById('root');

export const MainContext = React.createContext();

function Main({ children }) {
  const [value, setValue] = useState({ current: 'sd daa dasd a' });

  value.update = (obj) => {
    console.log('kuku');
    setValue({ current: obj });
  };

  return (
    <MainContext.Provider value={value}>
      <WireUp>
        <Layout />
      </WireUp>
    </MainContext.Provider>
  );
}

export default Main;
