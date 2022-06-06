import { createSlice } from "@reduxjs/toolkit";

const baseURL = 'https://fe-diplom.herokuapp.com';

const initialState = {
  ticketsLast: [],
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

// fetch cities list by search filter
export const fetchCityFrom = (cityStr) => async () => { 
  async function getData(str) {
    let resp = await fetch(`https://fe-diplom.herokuapp.com/routes/cities?name=${str}`);
    let data = await resp.json();
    console.log('data inside getData=', data);
    return data;  //setCityFrom(data);
  }

  let timer1 = setTimeout( async () => {
    let cityStr2 = (cityStr === '') ? 'a' : cityStr;
    let data = await getData(cityStr2);
    console.log('cityStr2 data =', data);
    //dispatch(actionsTicketReducer.setCityFrom(data)); // custom setter
    return data;
  }, 500);
  //
  return () => clearTimeout(timer1);  
}


