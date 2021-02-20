import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/userService';
import { getAllTrips, getUserTrips } from '../services/tripService';
import history from '../history';
import { setTrips } from './tripSlice';

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
    initUser: (state,action) => {
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
  const result = await login(log, password);
  dispatch(setUser(result.data));
  try {
    if (result.data.user.promo === "ADMIN") {
      const data = await getAllTrips(getState().user.token);
      if(!data.data[0]) console.log("pas de voyage créé");
      dispatch(setTrips(data.data));
      history.push('/Admin');
    } else {
      const data = await getUserTrips(result.data.user.userId, getState().user.token);
      if(!data.data[0]) console.log("pas de voyage créé pour cet utilisateur");
      dispatch(setTrips(data.data));
      history.push('/User');
    }
  } catch (e) {
    // mettre ici un error handler
  }
};

export const logOut = async(dispatch) => {
  dispatch(initUser());
  history.push('/');
};

export const { setUser, initUser } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
