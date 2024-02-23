import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import layoutReducer from './layoutStore';
import generalReducer from './generalStore';
import accountReducer from './accountStore';
import userReducer from './userStore';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    general: generalReducer,
    account: accountReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
