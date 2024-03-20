import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type Institution = {
  id: number;
  plaidItemId: string;
  plaidInstitutionId: string;
  plaidAccessToken: string;
  plaidCursor: string;
  accounts: Account[];
};

export type Account = {
  id: number;
  plaidAccountId: string;
  plaidName: string;
  plaidOfficialName: string;
  plaidPersistentAccountId: string;
  plaidSubType: string;
  plaidType: string;
  plaidAvailableBalance: number;
  plaidCurrentBalance: number;
  plaidIsoCurrencyCode: string;
  plaidCreditLimit: number;
  transactions: Transaction[];
};

export type Transaction = {
  id: number;
  amount: number;
  plaidIsoCurrencyCode: number;
};

interface FinancialDataState {
  institutions: Institution[];
  accounts: {[plaidItemId: string]: Account[]};
  transactions: {[plaidAccountId: string]: Transaction[]};
}

export const initialState: FinancialDataState = {
  accounts: {},
  institutions: [],
  transactions: {},
};

export const financialDataSlice = createSlice({
  name: 'financialData',
  initialState,
  reducers: {
    addInstitution: (state, action: PayloadAction<Institution>) => {
      const match = state.institutions.findIndex(
        i => i.plaidAccessToken === action.payload.plaidAccessToken,
      );

      if (match >= 0) {
        state.institutions[match] = action.payload;
      } else {
        state.institutions.push(action.payload);
      }
    },
    setInstitutions: (state, action: PayloadAction<Institution[]>) => {
      state.institutions = action.payload;
    },
    setAccounts: (
      state,
      action: PayloadAction<{plaidItemId: string; accounts: Account[]}>,
    ) => {
      state.accounts[action.payload.plaidItemId] = action.payload.accounts;
    },
    setTransactions: (
      state,
      action: PayloadAction<{
        plaidAccountId: string;
        transactions: Transaction[];
      }>,
    ) => {
      state.transactions[action.payload.plaidAccountId] =
        action.payload.transactions;
    },
  },
});

export const {addInstitution, setInstitutions, setAccounts, setTransactions} =
  financialDataSlice.actions;

export const getInstitutions = (state: RootState) =>
  state.financialData.institutions;

export const getAccounts = (state: RootState) => state.financialData.accounts;

export const getTransactions = (state: RootState) =>
  state.financialData.transactions;

export default financialDataSlice.reducer;
