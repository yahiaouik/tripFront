import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/userService';
import { getAllTrips, getUserTrips } from '../services/tripService';
import history from '../history';
import { setTrips } from './tripSlice';
import { setError } from './errorSlice';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "",
    firstname: "",
    lastname: "",
    promo: "",
    email: "",
    password: "",
    token: ""
  },
  reducers: {
    initUser: (state, action) => {
      state.id = "";
      state.firstname = "";
      state.lastname = "";
      state.promo = "";
      state.email = "";
      state.password = "";
      state.token = "";
    },
    setUser: (state, action) => {
      state.id = action.payload.user.userId;
      state.firstname = action.payload.user.firstname;
      state.lastname = action.payload.user.lastname;
      state.promo = action.payload.user.promo;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.token = action.payload.token;
    }
  },
});

export const logUser = (log, password) => async (dispatch, getState) => {
  try {
    const result = await login(log, password);
    dispatch(setError({ open: true, message: "L'utilisateur s'est connecté avec succès ", severity: "success" }));
    dispatch(setUser(result.data));

    if (result.data.user.promo === "ADMIN") {
      const data = await getAllTrips(getState().user.token);
      if (!data.data[0]) {
        dispatch(setError({ open: true, message: "  Pas de voyage créé ", severity: "info" }));
      }
      dispatch(setTrips(data.data));
      history.push('/Admin');
    } else {
      const data = await getUserTrips(result.data.user.userId, getState().user.token);
      if (!data.data[0]) {
        dispatch(setError({ open: true, message: "Pas de voyage créé pour cet utilisateur", severity: "info" }));
      }
      dispatch(setTrips(data.data));
      history.push('/User');
    }
  } catch (e) {
    dispatch(setError({ open: true, message: e.response.data, severity: "error" }));
  }
};

export const logOut = async (dispatch) => {
  dispatch(initUser());
  history.push('/');
  dispatch(setError({ open: true, message: "L'utilisateur s'est déconnecté avec succès ", severity: "success" }));
};

export const { setUser, initUser } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
