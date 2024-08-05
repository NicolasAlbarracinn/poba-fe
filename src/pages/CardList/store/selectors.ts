import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { initialState } from '.';

const selectCardsList = (state: RootState) => state.cardList || initialState;
export const selectCards = createSelector(
  [selectCardsList],
  cardList => cardList.cards,
);
export const selectTotalCards = createSelector(
  [selectCardsList],
  cardList => cardList.total,
);
export const selectExpansions = createSelector(
  [selectCardsList],
  cardList => cardList.cardExpansions,
);

export const selectSearchOptions = createSelector(
  [selectCardsList],
  cardList => cardList.searchOptions,
);

export const selectIsLoadingCards = createSelector(
  [selectCardsList],
  cardList => cardList.loadingCards,
);

export const selectRefetch = createSelector(
  [selectCardsList],
  cardList => cardList.refetch,
);
