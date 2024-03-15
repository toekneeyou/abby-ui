import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type User = {
  username?: string;
  password?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  salt?: string;
};

interface UserState {
  user: User | undefined;
}

export const initialState: UserState = {user: undefined};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const getUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
