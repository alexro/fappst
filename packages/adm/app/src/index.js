import React from 'react';
import { render } from 'react-dom';

function App() {
  return (
    <div>
      <b>Hello world super super cool!</b>
    </div>
  );
}

export default App;

const rootElement = document.getElementById('root');
render(<App></App>, rootElement);

console.log('ho ho', API_KEY);
