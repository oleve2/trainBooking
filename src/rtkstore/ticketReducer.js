import { createSlice } from "@reduxjs/toolkit";

const baseURL = 'https://fe-diplom.herokuapp.com';

const initialState = {
  ticketsLast: [],
  ticketsSearchResult: [],
  searchParams: {
    // обяхательный параметры
    cityFrom: '', //[],
    cityTo: '', //[],

    // даты для обязаельных
    dateFrom: '',
    dateTo: '',

    // прочее
    isKupe: false,
    isPlatskart: false,
    isSitting: false,
    isLux: false,
    isWifi: false,
    isExpress: false,

    priceFrom: '',
    priceTo: '',
    
    timeArrivalFrom: '',
    timeArrivalTo: '',
    timeDepartureFrom: '',
    timeDepartureTo:'',
  }
}

const ticketReducer = createSlice({
  name: 'ticketReducer',
  initialState: initialState,
  reducers: {
    // cities
    setCityFrom(state, action) {
      state.searchParams.cityFrom = action.payload;
    },
    setCityTo(state, action) {
      state.searchParams.cityTo = action.payload;
    },
    // dates
    setDateFrom(state, action) {
      state.searchParams.dateFrom = action.payload;
    },
    setDateTo(state, action) {
      state.searchParams.dateTo = action.payload;
    },

    // Last
    setTicketsLast(state, action) {
      state.ticketsLast = action.payload;
    },

    // ticketsFound (by idFrom, idTo)
    setTicketsSearchResult(state, action) {
      state.ticketsSearchResult = action.payload;
    }
  }
})


export const actionsTicketReducer = ticketReducer.actions;
export default ticketReducer.reducer;

// latest tickets
export const fetchTicketsLast = () => async (dispatch) => {
  let resp = await fetch(`${baseURL}/routes/last`, {method: 'GET'});
  let data = await resp.json();
  dispatch(actionsTicketReducer.setTicketsLast(data));
}

// 
export const fetchRoutes = (idFrom, idTo) => async (dispatch) => { 
  let resp = await fetch(`${baseURL}/routes?from_city_id=${idFrom}&to_city_id=${idTo}`);
  let data = await resp.json();
  console.log('data tickets search=', data);
  dispatch(actionsTicketReducer.setTicketsSearchResult(data));
}


