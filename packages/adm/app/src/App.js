import React from "react";
import { useLocation } from "react-router-dom";
import { ConditionsList } from "./modules/conditionsList/ConditionsList";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div>{location.pathname}</div>
      <ConditionsList />
    </div>
  );
}

export default App;
