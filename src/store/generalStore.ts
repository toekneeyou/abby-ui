import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type RootStackParamList = {
  'Net Worth': {handleScroll: any};
  Transactions: undefined;
  Settings: undefined;
};

interface GeneralState {
  currentRoute: keyof RootStackParamList;
}

export const initialState: GeneralState = {
  currentRoute: 'Net Worth',
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
  },
});

export const {setCurrentRoute} = generalSlice.actions;

export const getCurrentRoute = (state: RootState) => state.general.currentRoute;

export default generalSlice.reducer;
