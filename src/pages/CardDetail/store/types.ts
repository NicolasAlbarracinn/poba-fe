import { PokemonCard } from 'interfaces/cards';

export interface CardDetailState {
  loadingCard: boolean;
  loadingCardUpdate: boolean;
  cardDetails: PokemonCard;
}
