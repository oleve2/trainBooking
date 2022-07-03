import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer';

const store = configureStore({
  reducer: {
    ticketReducer: ticketReducer,
  }
})

export default store;
