import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface weatherState {
//   forSaveCity: [];
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

// const initialState = {
//   forSaveCity: [],
//   loading: 'idle',
// } as UsersState;

// const citiesReducer = createSlice({
//   name: 'citiesReducer',
//   initialState,
//   reducers: {
//     setItemsForSave: (state: any, action: PayloadAction<string>) => {
//       // WeatherAPIRequest(state, action?.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(
//       fetchCityWeather.fulfilled,
//       (state, action: PayloadAction<any>) => {
//         // state.forSaveCity.push(action.payload);
//       }
//     );
//   },
// });

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
