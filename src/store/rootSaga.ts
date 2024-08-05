import { all, fork } from 'redux-saga/effects';
import { appSaga } from 'containers/App/appSaga';

export function* rootSaga() {
  yield all([fork(appSaga)]);
}
