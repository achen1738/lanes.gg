import { all } from 'redux-saga/effects';
import { saga as appSaga } from '../user/appSaga';
import { saga as expansionSaga } from '../expansion';

export default function* saga() {
  yield all([appSaga(), expansionSaga()]);
}
