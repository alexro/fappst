import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import conditionsListReducer from '../modules/conditionsList/conditionsListSlice';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    // conditionsList: conditionsListReducer,
  });
}
