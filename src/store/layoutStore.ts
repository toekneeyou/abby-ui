import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type ComponentNames = typeof componentNames;
export type ComponentName = keyof ComponentNames;

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
  layouts: {[Name in ComponentName]?: Layout};
  offsets: {[Name in ComponentName]?: Offset};
  isSubHeaderShown: boolean;
}

export const componentNames = {
  netWorthScreen: 'NetWorthScreen',
  header: 'Header',
  subHeader: 'SubHeader',
  infoDisplay: 'InfoDisplay',
  bottomNavBar: 'BottomNavBar',
};

export const zIndices: {[Name in ComponentName]?: number} = {
  netWorthScreen: 0,
  header: 100,
  subHeader: 90,
};
export const heights: {[Name in ComponentName]?: number} = {
  header: 50,
  subHeader: 40,
  infoDisplay: 120,
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
      action: PayloadAction<{name: ComponentName; layout: Layout}>,
    ) => {
      state.layouts[action.payload.name] = action.payload.layout;
    },
    setIsSubHeaderShown: (state, action: PayloadAction<boolean>) => {
      state.isSubHeaderShown = action.payload;
    },
    setOffset: (
      state,
      action: PayloadAction<{name: ComponentName; offset: Offset}>,
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
