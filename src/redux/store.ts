import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notesReducer, tagsReducer } from './slices';

const combinedReducer = combineReducers({
  notesReducer,
  tagsReducer,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
