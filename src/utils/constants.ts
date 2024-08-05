import { PokemonCard } from 'interfaces/cards';

export const PokemonCardDefault: PokemonCard = {
  cardCode: '',
  expansion: '',
  name: '',
  image: '',
  hp: 0,
  attack: 0,
  type: '',
  resist: '',
  weak: '',
  id: '',
};

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}
