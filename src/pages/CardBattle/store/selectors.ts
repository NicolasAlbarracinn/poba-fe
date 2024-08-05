import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from '.';

const selectCardBattle = (state: RootState) => state.cardBattle || initialState;
export const selectCardDetails = createSelector(
  [selectCardBattle],
  cardBattle => cardBattle.loading,
);
