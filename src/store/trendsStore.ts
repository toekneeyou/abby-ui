import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterTrends} from '@services/helper';

// DB stores top 4 in lower case
// DB doesn't store computed trends
export enum TrendCategories {
  'cash' = 'cash',
  'creditCards' = 'credit cards',
  'investments' = 'investments',
  'loans' = 'loans',
  // computed
  'netWorth' = 'net worth',
  'totalDebt' = 'total debt',
}

export type Trend = {
  value: number;
  category: TrendCategories;
  date: string;
};

export const TRENDS_STORAGE_KEY = 'trendsStorageKey';
export const SELECTED_TREND_CATEGORY_STORAGE_KEY = 'selectedTrendCategory';

interface TrendsState {
  isPanningTrendChart: boolean;
  trends: Trend[];
  selectedTrendCategory: TrendCategories;
  selectedTrendItem: Trend | null;
}

export const initialState: TrendsState = {
  isPanningTrendChart: false,
  trends: [],
  selectedTrendCategory: TrendCategories.netWorth,
  selectedTrendItem: null,
};

export const trendsStore = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsPanningTrendsChart: (state, action: PayloadAction<boolean>) => {
      state.isPanningTrendChart = action.payload;
    },
    setTrends: (state, action: PayloadAction<Trend[]>) => {
      state.trends = action.payload;
      AsyncStorage.setItem(TRENDS_STORAGE_KEY, JSON.stringify(action.payload));
    },
    setSelectedTrendItem: (state, action: PayloadAction<Trend>) => {
      state.selectedTrendItem = action.payload;
    },
    setSelectedTrendCategory: (
      state,
      action: PayloadAction<TrendCategories>,
    ) => {
      // set trend category first
      state.selectedTrendCategory = action.payload;
      // set last item as selectedTrendItem
      const trends = state.trends as Trend[];
      const filteredTrends = filterTrends(action.payload, trends);
      const lastItem = filteredTrends[filteredTrends.length - 1];
      if (lastItem) {
        state.selectedTrendItem = lastItem;
      }
      AsyncStorage.setItem(SELECTED_TREND_CATEGORY_STORAGE_KEY, action.payload);
    },
  },
});

export const {
  setIsPanningTrendsChart,
  setTrends,
  setSelectedTrendCategory,
  setSelectedTrendItem,
} = trendsStore.actions;

export const getIsPanningTrendsChart = (state: RootState) =>
  state.trends.isPanningTrendChart;
export const getTrends = (state: RootState) => state.trends.trends;
export const getSelectedTrendItem = (state: RootState) =>
  state.trends.selectedTrendItem;
export const getSelectedTrendCategory = (state: RootState) =>
  state.trends.selectedTrendCategory;

export default trendsStore.reducer;
