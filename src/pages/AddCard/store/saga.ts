import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastMessage } from 'components/ToastMessage';
import { PokemonCard } from 'pages/AddCard/types';
import { CREATE_CARD } from 'utils/endpoints';
import { actions } from '.';

export function* createCardRequest(action: PayloadAction<PokemonCard>) {
  const requestURL = `${CREATE_CARD}`;
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(action.payload),
    };
    yield call(axios, requestURL, requestOptions);
    yield put(actions.createCardSuccess());
    toastMessage('Card added succesfully');
  } catch (err) {
    yield put(actions.createCardFailed());
  }
}

export function* createCardSaga() {
  yield takeLatest(actions.createCardRequest.type, createCardRequest);
}
