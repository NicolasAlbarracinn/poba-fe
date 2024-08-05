import { PokemonCard } from 'pages/AddCard/types';

export interface CardDetailState {
  loadingCard: boolean;
  loadingCardUpdate: boolean;
  cardDetails: PokemonCard;
}
