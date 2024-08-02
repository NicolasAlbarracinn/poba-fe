export interface CardListState extends CardResponse {
  loading: boolean;
}

export interface CardResponse {
  cards: Card[] | [];
  cardExpansions: string[] | [];
  total: number;
  searchOptions: SearchOptions[] | [];
}

export interface SearchOptions {
  cardCode: string;
  id: string;
  name: string;
}

export interface GetCardSearchOptionsRequest {
  searchName: string;
}

export interface GetCardsRequest {
  page: number;
  amount: number;
  type: string;
  expansion: string;
}

export interface Card {
  id: string;
  createdAt: string;
  updatedAt: string;
  cardCode: string;
  name: string;
  image: string;
  hp: number;
  attack: number;
  type: string;
  resist: string;
  weak: string;
  expansion: string;
  userId: string;
  updatedBy: string | null;
}
