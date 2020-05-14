import React from 'react';
import { useLocation } from 'react-router-dom';
import { ConditionsList } from './modules/conditionsList/ConditionsList';
import SimpleForm from './modules/SimpleForm';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div>{location.pathname}</div>
      <hr />
      {/* <SimpleForm onSubmit={showResults} /> */}
      <hr />
      <ConditionsList />
    </div>
  );
}

export default App;
