import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonCard } from 'pages/AddCard/types';
import { initialCardForm } from 'utils/constants';
import { cardDetailSaga } from './saga';
import { CardDetailState } from './types';

export const initialState: CardDetailState = {
  loadingCard: false,
  loadingCardUpdate: false,
  cardDetails: initialCardForm,
};

const cardDetailSlice = createSlice({
  name: 'cardDetail',
  initialState,
  reducers: {
    getCardRequest(state, _action: PayloadAction<string>) {
      state.loadingCard = true;
    },
    getCardSuccess(state, action: PayloadAction<PokemonCard>) {
      state.loadingCard = false;
      state.cardDetails = action.payload;
    },
    getCardFailed(state) {
      state.loadingCard = false;
    },
    updateCardRequest(state, _action: PayloadAction<PokemonCard>) {
      state.loadingCardUpdate = true;
    },
    updateCardSuccess(state) {
      state.loadingCardUpdate = false;
    },
    updateCardFailed(state) {
      state.loadingCardUpdate = false;
    },
  },
});

export const { actions, reducer } = cardDetailSlice;

export const useCardDetailSlice = () => {
  useInjectReducer({
    key: cardDetailSlice.name,
    reducer: cardDetailSlice.reducer,
  });
  useInjectSaga({ key: cardDetailSlice.name, saga: cardDetailSaga });
  return { actions: cardDetailSlice.actions };
};
