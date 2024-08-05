import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from '.';

const selectAddCArd = (state: RootState) => state.addCard || initialState;
export const selectIsLoading = createSelector(
  [selectAddCArd],
  addCard => addCard.loading,
);
