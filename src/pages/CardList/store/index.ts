import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCardsSaga } from './saga';
import {
  CardListState,
  CardResponse,
  GetCardsRequest,
  SearchOptions,
} from './types';

export const initialState: CardListState = {
  cards: [],
  cardExpansions: [],
  searchOptions: [],
  total: 0,
  loading: false,
};

const cardsListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    getCardsRequest(state, _action: PayloadAction<GetCardsRequest>) {
      state.loading = true;
    },
    getCardsSuccess(state, action: PayloadAction<CardResponse>) {
      state.cards = action.payload.cards;
      state.total = action.payload.total;
    },
    getCardsFailed(state) {
      state.loading = false;
    },
    getCardsExpansionsRequest(state) {
      state.loading = true;
    },
    getCardsExpansionsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.cardExpansions = action.payload;
    },
    getCardsExpansionsFailed(state) {
      state.loading = false;
    },
    getSearchOptionsRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    getSearchOptionsSuccess(state, action: PayloadAction<SearchOptions[]>) {
      state.loading = false;
      state.searchOptions = action.payload;
    },
    getSearchOptionsFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer } = cardsListSlice;

export const useCardsListSlice = () => {
  useInjectReducer({
    key: cardsListSlice.name,
    reducer: cardsListSlice.reducer,
  });
  useInjectSaga({ key: cardsListSlice.name, saga: getCardsSaga });
  return { actions: cardsListSlice.actions };
};
