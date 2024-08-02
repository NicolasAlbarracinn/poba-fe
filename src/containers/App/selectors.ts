import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from './appSlice';

const selectApp = (state: RootState) => state.app || initialState;
export const selectAppUser = createSelector([selectApp], app => app.user);
export const selectAppGoogleToken = createSelector(
  [selectApp],
  app => app.googleToken,
);
