import { all, call, spawn } from 'redux-saga/effects';
import { helloSaga } from '../modules/conditionsList/sagas';

function* rootSaga() {
  const sagas = [helloSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;
