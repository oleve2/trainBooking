import { createSlice } from "@reduxjs/toolkit";

//const baseURL = process.env.REACT_APP_BASE_URL;

const initialState = {
  passengersList: [],
  lastPassengerId: 1,
  paymentInfo: '',
}

const passengerReducer = createSlice({
  name: 'passengerReducer',
  initialState: initialState,
  reducers: {
    // passengersList
    setpassengersList(state, action) { state.passengersList = action.payload },
    // lastPassengerId
    setlastPassengerId(state, action) { state.lastPassengerId = action.payload },
    // paymentInfo
    setpaymentInfo(state, action) { state.paymentInfo = action.payload }
  }
})

export const actionsPassengerReducer = passengerReducer.actions;
export default passengerReducer.reducer;

