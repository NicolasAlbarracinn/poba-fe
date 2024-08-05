import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cardBattleSaga } from './saga';
import { CardBattleState, CreateCardBattleRequest } from './types';

export const initialState: CardBattleState = {
  loading: false,
};

const cardBattleSlice = createSlice({
  name: 'cardBattle',
  initialState,
  reducers: {
    createCardBattleRequest(
      state,
      _action: PayloadAction<CreateCardBattleRequest>,
    ) {
      state.loading = true;
    },
    createCardBattleSuccess(state) {
      state.loading = false;
    },
    createCardBattleFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer } = cardBattleSlice;

export const useCardBattleSlice = () => {
  useInjectReducer({
    key: cardBattleSlice.name,
    reducer: cardBattleSlice.reducer,
  });
  useInjectSaga({ key: cardBattleSlice.name, saga: cardBattleSaga });
  return { actions: cardBattleSlice.actions };
};
