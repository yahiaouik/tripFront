import { createSlice } from '@reduxjs/toolkit';
import { getAllTrips, getUserTrips, createUserTrip, updateUserTrip, deleteUserTrip } from '../services/tripService';

export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: []
  },
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    filterTrips: (state, action) => {
      state.trips = state.trips.filter((trip) =>
        trip.userFirstname.includes(action.payload.firstname)
        && trip.userLastname.includes(action.payload.lastname)
        && trip.userPromo.includes(action.payload.promo)
        && trip.country.includes(action.payload.country)
        && trip.city.includes(action.payload.city)
        && trip.status.includes(action.payload.status)
        && !(trip.arrival_date >= action.payload.departureDate
          || trip.departure_date <= action.payload.arrivalDate)
      );
    },
    filterUserTrips: (state, action) => {
      state.trips = state.trips.filter((trip) =>
        trip.country.includes(action.payload.country)
        && trip.city.includes(action.payload.city)
        && trip.status.includes(action.payload.status)
        && !(trip.arrival_date >= action.payload.departureDate
          || trip.departure_date <= action.payload.arrivalDate)
      );
    }
  },
});

export const filterTrip = filters => async (dispatch, getState) => {
  let result;
  const user = getState().user;
  if (user.promo === "ADMIN") {
    result = await getAllTrips(user.token);
    dispatch(setTrips(result.data));
    dispatch(filterTrips(filters));
  } else {
    result = await getUserTrips(user.id, user.token);
    dispatch(setTrips(result.data));
    dispatch(filterUserTrips(filters));
  }
};

export const createTrip = (country,countryId,city,arrivalDate,departureDate)=> async (dispatch, getState) => {
  const user = getState().user;
  const trip = {
    country: country,
    countryId: countryId,
    city: city ,
    arrivalDate: arrivalDate,
    departureDate: departureDate,
    status: "En attente de validation",
    userId: user.id
}
  const result = await createUserTrip(trip, user.token);
  dispatch(setTrips(result.data));
}

export const updateTrip = (tripId, country,countryId,city,arrivalDate,departureDate)=> async (dispatch, getState) => {
  const user = getState().user;
  const trip = {
    tripId: tripId,
    country: country,
    countryId: countryId,
    city: city ,
    arrivalDate: arrivalDate,
    departureDate: departureDate,
    status: "En attente de validation",
    userId: user.id
}
  const result = await updateUserTrip(trip, user.token);
  dispatch(setTrips(result.data));
}

export const deleteTrip = (tripId) => async (dispatch, getState) => {
  const user = getState().user;
  const result = await deleteUserTrip(tripId, user.token);
  dispatch(setTrips(result.data));
}

export const validateTrip = (tripId,userId,country,countryId,city,arrivalDate,departureDate)=> async (dispatch, getState) => {
  const user = getState().user;
  const trip = {
    tripId: tripId,
    country: country,
    countryId: countryId,
    city: city ,
    arrivalDate: arrivalDate,
    departureDate: departureDate,
    status: "Validé",
    userId: userId,
    userFirstname : user.firstname,
    userLastname: user.lastname,
    userPromo: user.promo
}
  const result = await updateUserTrip(trip, user.token);
  dispatch(setTrips(result.data));
}



export const { setTrips, filterTrips, filterUserTrips } = tripSlice.actions;

export const selectTrips = state => state.trips.trips;

export default tripSlice.reducer;
