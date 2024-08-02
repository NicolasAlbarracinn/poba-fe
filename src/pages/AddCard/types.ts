export interface PokemonCard {
  cardCode: string;
  expansion: string;
  image: string;
  name: string;
  hp: number;
  attack: number;
  type: string;
  resist: string;
  weak: string;
}

export interface IAddCardFormErrors {
  cardCode: string;
  expansion: string;
  name: string;
  image: string;
  hp: string;
  attack: string;
  type: string;
  resist: string;
  weak: string;
}

export interface Errors {
  name?: string;
  expansion?: string;
  image?: string;
  hp?: string;
  attack?: string;
  type?: string;
  cardCode?: string;
}
