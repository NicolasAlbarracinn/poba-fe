import { AppState } from 'containers/App/types';
import { AddCardState } from 'pages/AddCard/store/types';
import { CardListState } from 'pages/CardList/store/types';
import { LoginState } from 'pages/Login/store/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  login?: LoginState;
  addCard?: AddCardState;
  app?: AppState;
  cardList?: CardListState;
}
