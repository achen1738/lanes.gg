import { all } from 'redux-saga/effects';
import { saga as appSaga } from '../user/appSaga';
export default function* saga() {
  yield all([appSaga()]);
}
