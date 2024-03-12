import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type RootStackParamList = {
  Loading: undefined;
  'Net Worth': undefined;
  Transactions: undefined;
  Settings: undefined;
};

interface GeneralState {
  currentRoute: keyof RootStackParamList;
  isAppLoading: boolean;
}

export const initialState: GeneralState = {
  currentRoute: 'Loading',
  isAppLoading: true,
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
  },
});

export const {setCurrentRoute, setIsAppLoading} = generalSlice.actions;

export const getCurrentRoute = (state: RootState) => state.general.currentRoute;
export const getIsAppLoading = (state: RootState) => state.general.isAppLoading;

export default generalSlice.reducer;
