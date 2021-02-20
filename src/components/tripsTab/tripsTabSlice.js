import { createSlice } from '@reduxjs/toolkit';

export const tripTabSlice = createSlice({
  name: 'tripsTab',
  initialState: {
    value: 0 ,
  },
  reducers: {
    setTabValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setTabValue } = tripTabSlice.actions;

export const changeTabValueAsync = newValue => dispatch => {
    dispatch(setTabValue(newValue));
};

export const selectValue = state => state.tripsTab.value;

export default tripTabSlice.reducer;
