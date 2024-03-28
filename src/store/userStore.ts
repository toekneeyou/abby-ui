import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Account, Institution, Transaction} from './financialDataStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  username?: string;
  password?: string;
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  salt?: string;
  institutions: Institution[];
  accounts: {[plaidItemId: string]: Account[]};
  transactions: {[plaidAccountId: string]: Transaction[]};
};

interface UserState {
  user:
    | Omit<
        User,
        'institutions' | 'accounts' | 'transactions' | 'salt' | 'password'
      >
    | undefined;
  linkToken: string | undefined;
}

export const USER_ID_STORAGE_KEY = 'userIdStorageKey';

export const initialState: UserState = {
  user: undefined,
  linkToken: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      AsyncStorage.setItem(USER_ID_STORAGE_KEY, String(action.payload.id));
    },
    setLinkToken: (state, action: PayloadAction<string>) => {
      state.linkToken = action.payload;
    },
  },
});

export const {setUser, setLinkToken} = userSlice.actions;

export const getUser = (state: RootState) => state.user.user;
export const getLinkToken = (state: RootState) => state.user.linkToken;

export default userSlice.reducer;
