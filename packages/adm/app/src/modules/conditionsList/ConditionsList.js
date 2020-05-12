import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadData,
  selectId,
  selectInitialized,
  selectItems,
  selectSelectedId,
  initialize,
  selectTest,
  fetchUserById,
} from "./conditionsListSlice";

export function ConditionsList() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialized);
  const items = useSelector(selectItems);
  const selectedId = useSelector(selectSelectedId);
  const test = useSelector(selectTest);

  if (!initialized) {
    dispatch(fetchUserById());
  }

  return (
    <p>
      <b>{test}</b>
    </p>
  );

  if (!items) {
    return <div>No</div>;
  }

  if (items.length === 0) {
    return <h1>No Data</h1>;
  }

  return <div>Conditions</div>;
}
