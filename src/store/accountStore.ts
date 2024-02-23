import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {accountData} from '../mockData/accountData';

interface AccountState {
  accounts: any;
}

export const initialState: AccountState = {
  accounts: accountData,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
});

export const {} = accountSlice.actions;

export const getAccountData = (state: RootState) => state.account.accounts;

export default accountSlice.reducer;
