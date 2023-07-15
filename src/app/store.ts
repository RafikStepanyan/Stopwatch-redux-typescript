import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import watchSlice from '../features/stopwatch/watchSlice';

export const store = configureStore({
  reducer: {
    watch: watchSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
