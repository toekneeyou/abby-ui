import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Institution Types
export const institutionsStorageKey = 'institutions';
export type Institution = {
  id: number;
  plaidItemId: string;
  plaidInstitutionId: string;
  plaidAccessToken: string;
  plaidCursor: string;
  accounts: Account[];
};

// Account Types
export const accountsStorageKey = 'accounts';
export type AccountType =
  | 'depository'
  | 'loan'
  | 'investment'
  | 'credit'
  | 'other';
export type Account = {
  id: number;
  plaidAccountId: string;
  plaidName: string;
  plaidOfficialName: string;
  plaidPersistentAccountId: string;
  plaidSubType: string;
  plaidType: AccountType;
  plaidAvailableBalance: number;
  plaidCurrentBalance: number;
  plaidIsoCurrencyCode: string;
  plaidCreditLimit: number;
  transactions: Transaction[];
};
export type AccountsState = {[type in AccountType]?: Account[]};

// Transaction Types
export const transactionsStorageKey = 'transactions';
export type Transaction = {
  id: number;
  amount: number;
  plaidIsoCurrencyCode: number;
};
export type TransactionsState = {[plaidAccountId: string]: Transaction[]};

interface FinancialDataState {
  institutions: Institution[];
  accounts: AccountsState;
  transactions: TransactionsState;
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
      AsyncStorage.setItem(
        institutionsStorageKey,
        JSON.stringify(action.payload),
      );
    },
    setAccounts: (state, action: PayloadAction<AccountsState>) => {
      state.accounts = action.payload;
      AsyncStorage.setItem(accountsStorageKey, JSON.stringify(action.payload));
    },
    setTransactions: (state, action: PayloadAction<TransactionsState>) => {
      state.transactions = action.payload;
      AsyncStorage.setItem(
        transactionsStorageKey,
        JSON.stringify(action.payload),
      );
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

export const getNetWorth = (state: RootState) => {
  let netWorth = 0;
  Object.entries(state.financialData.accounts).forEach(entries => {
    const type = entries[0] as AccountType;
    const accounts = entries[1] as Account[];
    if (type === 'depository' || type === 'investment') {
      netWorth += accounts.reduce((p, c) => {
        return p + c.plaidCurrentBalance;
      }, 0);
    } else if (type === 'credit' || type === 'loan') {
      netWorth -= accounts.reduce((p, c) => {
        return p + c.plaidCurrentBalance;
      }, 0);
    }
  });
  return netWorth;
};

export default financialDataSlice.reducer;
