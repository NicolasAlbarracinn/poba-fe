import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastMessage } from 'components/ToastMessage';
import { PokemonCard } from 'pages/AddCard/types';
import { GET_CARDS, UPDATE_CARD } from 'utils/endpoints';
import { actions } from '.';

export function* getCardRequest(action: PayloadAction<string>) {
  const requestURL = `${GET_CARDS}/${action.payload}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const response = yield call(axios, requestURL, requestOptions);
    yield put(actions.getCardSuccess(response.data));
  } catch (err) {
    yield put(actions.getCardFailed());
  }
}

export function* updateCardRequest(action: PayloadAction<PokemonCard>) {
  const requestURL = `${UPDATE_CARD}`;
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(action.payload),
    };
    yield call(axios, requestURL, requestOptions);
    yield put(actions.updateCardSuccess());
    toastMessage('Card updated succesfully');
  } catch (err) {
    yield put(actions.updateCardFailed());
  }
}

export function* cardDetailSaga() {
  yield takeLatest(actions.getCardRequest.type, getCardRequest);
  yield takeLatest(actions.updateCardRequest.type, updateCardRequest);
}