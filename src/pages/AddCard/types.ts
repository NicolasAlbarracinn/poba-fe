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
  id?: string;
}
