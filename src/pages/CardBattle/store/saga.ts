import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toastMessage } from 'components/ToastMessage';
import { ToastType } from 'utils/constants';
import { CREATE_CARD_BATTLE } from 'utils/endpoints';
import { actions } from '.';
import { CreateCardBattleRequest } from './types';

export function* createCardBattle(
  action: PayloadAction<CreateCardBattleRequest>,
) {
  const requestURL = `${CREATE_CARD_BATTLE}`;
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(action.payload),
    };
    const response = yield call(axios, requestURL, requestOptions);
    yield put(actions.createCardBattleSuccess());
    if (response.data.result) {
      toastMessage('BATTLE WON');
    } else {
      toastMessage('BATTLE LOST', ToastType.WARN);
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toastMessage(err?.response?.data.message, ToastType.ERROR);
    }
    yield put(actions.createCardBattleSuccess());
  }
}

export function* cardBattleSaga() {
  yield takeLatest(actions.createCardBattleRequest.type, createCardBattle);
}
