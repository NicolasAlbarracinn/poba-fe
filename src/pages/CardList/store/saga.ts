import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
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

export function* getCardsRequest(action: PayloadAction<GetCardsRequest>) {
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
export function* getCardsExpansionsRequest() {
  const requestURL = `${GET_CARDS_EXPANSIONS}`;
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const response: AxiosResponse<CardResponse> = yield call(
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

export function* getCardsSaga() {
  yield takeLatest(
    actions.getCardsExpansionsRequest.type,
    getCardsExpansionsRequest,
  );
  yield takeLatest(actions.getCardsRequest.type, getCardsRequest);
  yield debounce(1000, actions.getSearchOptionsRequest.type, getSearchOptions);
}
