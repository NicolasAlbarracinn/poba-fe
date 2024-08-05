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
  loadingCards: false,
  loadingExpansions: false,
  loadingCardRemove: false,
  refetch: false,
};

const cardsListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    getCardsRequest(state, _action: PayloadAction<GetCardsRequest>) {
      state.loadingCards = true;
      state.refetch = false;
    },
    getCardsSuccess(state, action: PayloadAction<CardResponse>) {
      state.cards = action.payload.cards;
      state.total = action.payload.total;
      state.loadingCards = false;
    },
    getCardsFailed(state) {
      state.loadingCards = false;
    },
    getCardsExpansionsRequest(state) {
      state.loadingExpansions = true;
    },
    getCardsExpansionsSuccess(state, action: PayloadAction<string[]>) {
      state.loadingExpansions = false;
      state.cardExpansions = action.payload;
    },
    getCardsExpansionsFailed(state) {
      state.loadingExpansions = false;
    },
    getSearchOptionsRequest(_state, _action: PayloadAction<string>) {},
    getSearchOptionsSuccess(state, action: PayloadAction<SearchOptions[]>) {
      state.searchOptions = action.payload;
    },
    getSearchOptionsFailed(state) {
      state.loadingCardRemove = false;
    },
    removeCardRequest(state, _action: PayloadAction<string>) {
      state.loadingCardRemove = true;
    },
    removeCardSuccess(state) {
      state.loadingCardRemove = false;
      state.refetch = true;
    },
    removeCardFailed(state) {
      state.loadingCardRemove = false;
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
