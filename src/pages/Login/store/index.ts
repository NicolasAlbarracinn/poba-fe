import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetLoginRequest } from '../types';
import { loginSaga } from './saga';
import { LoginState } from './types';

export const initialState: LoginState = {
  loading: false,
};

const logincSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getLoginRequest(state, _action: PayloadAction<GetLoginRequest>) {
      state.loading = true;
    },
    getLoginSuccess(state) {
      state.loading = false;
    },
    getLoginFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer } = logincSlice;

export const useLoginSlice = () => {
  useInjectReducer({ key: logincSlice.name, reducer: logincSlice.reducer });
  useInjectSaga({ key: logincSlice.name, saga: loginSaga });
  return { actions: logincSlice.actions };
};
