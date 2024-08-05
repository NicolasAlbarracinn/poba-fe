export interface CardBattleState {
  loading: boolean;
}

export interface CreateCardBattleRequest {
  cardChosenId: string;
  cardAgainstId: string;
}
