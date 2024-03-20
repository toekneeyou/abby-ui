import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type RootStackParamList = {
  Login: undefined;
  'Net Worth': undefined;
  Transactions: undefined;
  Settings: undefined;
};

export type AbbyEnvironment = 'development' | 'production';

interface GeneralState {
  currentRoute: keyof RootStackParamList;
  isAppLoading: boolean;
  isAuthenticated: boolean;
  env: AbbyEnvironment;
  error: Error | undefined;
}

export const initialState: GeneralState = {
  currentRoute: 'Login',
  isAppLoading: true,
  isAuthenticated: false,
  env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  error: undefined,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCurrentRoute: (
      state,
      action: PayloadAction<keyof RootStackParamList>,
    ) => {
      if (state.currentRoute !== action.payload) {
        state.currentRoute = action.payload;
      }
    },
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action: PayloadAction<Error | undefined>) => {
      state.error = action.payload;
    },
  },
});

export const {setCurrentRoute, setIsAppLoading, setIsAuthenticated, setError} =
  generalSlice.actions;

export const getCurrentRoute = (state: RootState) => state.general.currentRoute;
export const getIsAppLoading = (state: RootState) => state.general.isAppLoading;
export const getIsAuthenticated = (state: RootState) =>
  state.general.isAuthenticated;
export const getEnv = (state: RootState) => state.general.env;
export const getError = (state: RootState) => state.general.error;

export default generalSlice.reducer;
