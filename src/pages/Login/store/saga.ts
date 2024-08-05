import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastMessage } from 'components/ToastMessage';
import { appActions } from 'containers/App/appSlice';
import { persistor } from 'store/configureStore';
import { ToastType } from 'utils/constants';
import { GET_USER_LOGIN } from 'utils/endpoints';
import { actions } from '.';
import { GetLoginRequest } from './types';

export function* getLoginRequest(action: PayloadAction<GetLoginRequest>) {
  const requestURL = `${GET_USER_LOGIN}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: {
        credential: action.payload.credential,
      },
    };
    const response = yield call(axios, requestURL, requestOptions);
    yield put(actions.getLoginSuccess());
    yield put(appActions.setUser(response.data.user));
    persistor.flush();
  } catch (err) {
    toastMessage('Oops! Something went wrong', ToastType.ERROR);
    yield put(actions.getLoginFailed());
  }
}

export function* loginSaga() {
  yield takeLatest(actions.getLoginRequest.type, getLoginRequest);
}
