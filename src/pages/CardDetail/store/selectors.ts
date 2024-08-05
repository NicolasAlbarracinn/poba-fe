import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from '.';

const selectCardDetail = (state: RootState) => state.cardDetail || initialState;
export const selectCardDetails = createSelector(
  [selectCardDetail],
  cardList => cardList.cardDetails,
);
export const selectIsCardLoading = createSelector(
  [selectCardDetail],
  cardList => cardList.loadingCard,
);
export const selectLoadingCardUpdate = createSelector(
  [selectCardDetail],
  cardList => cardList.loadingCardUpdate,
);
