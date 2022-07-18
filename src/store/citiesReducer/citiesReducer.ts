import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface objRespons {
  name?: string;
}

interface weatherState {
  forSaveCity: objRespons | [];
  loading: Boolean;
  error: string;
}

const initialState: weatherState = {
  forSaveCity: {},
  loading: false,
  error: '',
};

const citiesSlice = createSlice({
  name: 'citiesReducer',
  initialState,
  reducers: {
    forSaveCityFetching(state) {
      state.loading = true;
    },
    forSaveCitySuccess(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.error = '';
      state.forSaveCity = action.payload;
    },
    forSaveCityError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { forSaveCityFetching, forSaveCitySuccess, forSaveCityError } =
  citiesSlice.actions;
export default citiesSlice.reducer;
