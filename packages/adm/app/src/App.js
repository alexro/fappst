import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './assets/App.scss';
import ErrorBoundary from './components/ErrorBoundary';
import Modal from './components/Modal';
import { ConditionsList } from './modules/conditionsList/ConditionsList';
import SimpleForm from './modules/SimpleForm';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function showResults(values) {
  console.log(values);
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

function App() {
  const location = useLocation();

  const fields = [
    ReactDOM.createPortal(<input />, document.getElementById('col1')),
    ReactDOM.createPortal(<input />, document.getElementById('col2')),
    ReactDOM.createPortal(<input />, document.getElementById('col3')),
  ];

  return (
    <ErrorBoundary>
      <div className="App">
        <div>{location.pathname}</div>
        <hr />
        {/* <SimpleForm onSubmit={showResults} /> */}
        <hr />
        <ConditionsList />
      </div>
      {/* <Modal>
        <h1 className="modal">cola mola</h1>
      </Modal> */}
      {fields}
    </ErrorBoundary>
  );
}

export default App;
