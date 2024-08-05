import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { USER_LOGOUT } from 'utils/endpoints';
import { appActions } from './appSlice';

export function* logout() {
  const requestURL = `${USER_LOGOUT}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    yield call(axios, requestURL, requestOptions);
  } finally {
    yield put(appActions.setUser(null));
  }
}

export function* appSaga() {
  yield takeLatest(appActions.appLogOutRequest.type, logout);
}
