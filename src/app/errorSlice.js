import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        open: false,
        message: "",
        severity: ""
    },
    reducers: {
        setError: (state, action) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        initError: (state, action) => {
            state.open = false;
            state.message = "";
        }
    },
});

export const { setError, initError } = errorSlice.actions;

export const selectError = state => state.error;

export default errorSlice.reducer;
