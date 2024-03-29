import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type Layout = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type Offset = {
  xOffset?: number;
  yOffset?: number;
};

interface LayoutState {
  layouts: {[key: string]: Layout};
  offsets: {[key: string]: Offset};
  isSubHeaderShown: boolean;
}

export const zIndices = {
  homeScreen: 0,
  header: 100,
  subHeader: 90,
  dropdown: 80,
};
export const heights = {
  header: 36,
  subHeader: 40,
  trendDetail: 90,
  trendCategoryFilter: 40,
  chart: 100,
  chartFilters: 40,
  progressBar: 4,
};

export const paddings = {
  standard: {h: 20, v: 20},
  trendDetail: {h: 20, v: 20},
  trendCategoryFilter: {h: 20, v: 4},
  header: {h: 20, v: 0},
  accountCards: {h: 20, v: 15},
  chartFilters: {h: 20, v: 0},
};

const initialState: LayoutState = {
  layouts: {},
  isSubHeaderShown: false,
  offsets: {},
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (
      state,
      action: PayloadAction<{name: string; layout: Layout}>,
    ) => {
      state.layouts[action.payload.name] = action.payload.layout;
    },
    setIsSubHeaderShown: (state, action: PayloadAction<boolean>) => {
      state.isSubHeaderShown = action.payload;
    },
    setOffset: (
      state,
      action: PayloadAction<{name: string; offset: Offset}>,
    ) => {
      state.offsets[action.payload.name] = action.payload.offset;
    },
  },
});

export const {setLayout, setIsSubHeaderShown, setOffset} = layoutSlice.actions;

export const getIsSubHeaderShown = (state: RootState) =>
  state.layout.isSubHeaderShown;
export const getLayouts = (state: RootState) => state.layout.layouts;
export const getOffsets = (state: RootState) => state.layout.offsets;

export default layoutSlice.reducer;
