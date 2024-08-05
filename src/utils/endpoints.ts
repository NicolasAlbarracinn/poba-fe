export const BASE_URL = `http://${getCurrentEnvironment()}:3005/api`;
export const GET_USER_LOGIN = `${BASE_URL}/auth/google/login`;
export const USER_LOGOUT = `${BASE_URL}/auth/logout`;
export const CREATE_CARD = `${BASE_URL}/card/create`;
export const GET_CARDS = `${BASE_URL}/card`;
export const GET_CARDS_EXPANSIONS = `${BASE_URL}/card/expansions`;
export const GET_CARDS_SEARCH_OPTIONS = `${BASE_URL}/card/search-options`;
export const GET_CARD = `${BASE_URL}/card/`;
export const UPDATE_CARD = `${BASE_URL}/card/`;

export function getCurrentEnvironment() {
  const host = window.location.hostname;
  return host;
}
