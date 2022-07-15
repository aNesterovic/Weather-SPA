import { combineReducers, configureStore } from '@reduxjs/toolkit';
import citiesReducer from './citiesReducer/citiesReducer';

const rootReducer = combineReducers({
  citiesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
