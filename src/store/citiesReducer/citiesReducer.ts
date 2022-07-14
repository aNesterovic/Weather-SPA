import { createSlice } from '@reduxjs/toolkit';

const citiesReducer = createSlice({
  name: 'citiesReducer',
  initialState: {
    forSaveCity: [],
  },
  reducers: {
    setItemsForSave: (state, action) => {
      state.forSaveCity.push(action.payload);
    },
  },
});

export const { setItemsForSave } = citiesReducer.actions;
export default citiesReducer.reducer;
