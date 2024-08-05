import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonCard } from 'interfaces/cards';
import { createCardSaga } from './saga';
import { AddCardState } from './types';

export const initialState: AddCardState = {
  loading: false,
};

const addCardslice = createSlice({
  name: 'addCard',
  initialState,
  reducers: {
    createCardRequest(state, _action: PayloadAction<PokemonCard>) {
      state.loading = true;
    },
    createCardSuccess(state) {
      state.loading = false;
    },
    createCardFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer } = addCardslice;

export const useCreateCardSlice = () => {
  useInjectReducer({ key: addCardslice.name, reducer: addCardslice.reducer });
  useInjectSaga({ key: addCardslice.name, saga: createCardSaga });
  return { actions: addCardslice.actions };
};
