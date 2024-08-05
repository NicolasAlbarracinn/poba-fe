import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from '.';

const selectLogin = (state: RootState) => state.login || initialState;
export const selectIsLoading = createSelector(
  [selectLogin],
  login => login.loginLoading,
);
