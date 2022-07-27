import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer';
import passengerReducer from './passengerReducer';

const store = configureStore({
  reducer: {
    ticketReducer: ticketReducer,
    passengerReducer: passengerReducer,
  }
})

export default store;
