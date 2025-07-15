import { configureStore } from '@reduxjs/toolkit';
import sosReducer from '../features/sos/sosSlice';

export const store = configureStore({
  reducer: {
    sos: sosReducer,
  },
});