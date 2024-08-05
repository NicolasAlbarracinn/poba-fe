import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, User } from './types';

export const initialState: AppState = {
  user: null,
  googleToken: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.googleToken = action.payload;
    },
    appLogOutRequest() {},
  },
});

export const { actions: appActions, reducer: appReducer } = appSlice;
