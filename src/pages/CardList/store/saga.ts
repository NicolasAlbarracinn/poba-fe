import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { toastMessage } from 'components/ToastMessage';
import {
  GET_CARDS,
  GET_CARDS_EXPANSIONS,
  GET_CARDS_SEARCH_OPTIONS,
} from 'utils/endpoints';
import { actions } from '.';
import {
  CardResponse,
  GetCardSearchOptionsRequest,
  GetCardsRequest,
  SearchOptions,
} from './types';

export function* getCards(action: PayloadAction<GetCardsRequest>) {
  const requestURL = `${GET_CARDS}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: {
        page: action.payload.page,
        amount: action.payload.amount,
        type: action.payload.type,
        expansion: action.payload.expansion,
        cardId: action.payload.cardId,
      },
    };
    const response: AxiosResponse<CardResponse> = yield call(
      axios,
      requestURL,
      requestOptions,
    );
    yield put(actions.getCardsSuccess(response.data));
  } catch (err) {
    yield put(actions.getCardsFailed());
  }
}
export function* getCardsExpansions() {
  const requestURL = `${GET_CARDS_EXPANSIONS}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const response: AxiosResponse<string[]> = yield call(
      axios,
      requestURL,
      requestOptions,
    );
    yield put(actions.getCardsExpansionsSuccess(response.data));
  } catch (err) {
    yield put(actions.getCardsExpansionsFailed());
  }
}
export function* getSearchOptions(
  action: PayloadAction<GetCardSearchOptionsRequest>,
) {
  const requestURL = `${GET_CARDS_SEARCH_OPTIONS}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: {
        term: action.payload,
      },
    };

    const response: AxiosResponse<SearchOptions[]> = yield call(
      axios,
      requestURL,
      requestOptions,
    );
    yield put(actions.getSearchOptionsSuccess(response.data));
  } catch (err) {
    yield put(actions.getSearchOptionsFailed());
  }
}

export function* removeCard(action: PayloadAction<string>) {
  const requestURL = `${GET_CARDS}/${action.payload}`;
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    yield call(axios, requestURL, requestOptions);
    toastMessage('Card deleted succesfully');
    yield put(actions.removeCardSuccess());
  } catch (err) {
    yield put(actions.removeCardFailed());
  }
}

export function* getCardsSaga() {
  yield takeLatest(actions.getCardsExpansionsRequest.type, getCardsExpansions);
  yield takeLatest(actions.getCardsRequest.type, getCards);
  yield takeLatest(actions.removeCardRequest.type, removeCard);
  yield debounce(1000, actions.getSearchOptionsRequest.type, getSearchOptions);
}
