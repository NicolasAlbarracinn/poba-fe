import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, User } from './types';

export const initialState: AppState = {
  user: {},
  googleToken: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.googleToken = action.payload;
    },
  },
});

export const { actions: appActions, reducer: appReducer } = appSlice;
