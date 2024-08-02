import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { PokemonCard } from 'pages/AddCard/types';
import { CREATE_CARD } from 'utils/endpoints';
import { request } from 'utils/request';
import { actions } from '.';

export function* createCardRequest(action: PayloadAction<PokemonCard>) {
  const requestURL = `${CREATE_CARD}`;
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, requestOptions);
    yield put(actions.createCardSuccess(response.user));
  } catch (err) {
    yield put(actions.createCardFailed());
  }
}

export function* createCardSaga() {
  yield takeLatest(actions.createCardRequest.type, createCardRequest);
}
