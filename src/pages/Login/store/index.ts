import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginSaga } from './saga';
import { GetLoginRequest, LoginState } from './types';

export const initialState: LoginState = {
  loginLoading: false,
};

const logincSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getLoginRequest(state, _action: PayloadAction<GetLoginRequest>) {
      state.loginLoading = true;
    },
    getLoginSuccess(state) {
      state.loginLoading = false;
    },
    getLoginFailed(state) {
      state.loginLoading = false;
    },
  },
});

export const { actions, reducer } = logincSlice;

export const useLoginSlice = () => {
  useInjectReducer({ key: logincSlice.name, reducer: logincSlice.reducer });
  useInjectSaga({ key: logincSlice.name, saga: loginSaga });
  return { actions: logincSlice.actions };
};
