import { configureStore } from '@reduxjs/toolkit';
import tripsTabReducer from '../components/tripsTab/tripsTabSlice';
import tripsReducer from './tripSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';

export default configureStore({
  reducer: {
    tripsTab: tripsTabReducer,
    trips: tripsReducer,
    user: userReducer,
    error: errorReducer

  },
});
