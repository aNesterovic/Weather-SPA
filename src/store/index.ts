import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './citiesReducer/citiesReducer';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});
