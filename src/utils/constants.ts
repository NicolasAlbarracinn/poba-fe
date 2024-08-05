import { PokemonCard } from 'pages/AddCard/types';

export const initialCardForm: PokemonCard = {
  cardCode: '',
  expansion: '',
  name: '',
  image: '',
  hp: 0,
  attack: 0,
  type: '',
  resist: '',
  weak: '',
};

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}
