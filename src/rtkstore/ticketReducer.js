import { createSlice } from "@reduxjs/toolkit";

//const baseURL = 'https://fe-diplom.herokuapp.com';
const baseURL = process.env.REACT_APP_BASE_URL;   //'http://localhost:3001';


const initialState = {
  // -------------------------
  ticketsLast: [],
  ticketsSearchResult: [],
  
  // -------------------------
  // cnt ticket per page
  ticketsPerPage: 5,
  ticketsPerPageList: [5,10,15],
  offset: 0,

  cntBlocks: 0,
  sliderBlockList: [],
  sliderActive: 1,


  // -------------------------
  searchParams: {
    // обязательные параметры
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

    // API fetch results -------------------------------
    // Last
    setTicketsLast(state, action) {
      state.ticketsLast = action.payload;
    },

    // ticketsFound (by idFrom, idTo)
    setTicketsSearchResult(state, action) {
      state.ticketsSearchResult = action.payload;
    }, 

    // display options -------------------------------
    // set ticketsPerPage
    setticketsPerPage(state, action) {
      state.ticketsPerPage = action.payload;
    },

    // offset for slider
    settoffset(state, action) {
      state.offset = action.payload;
    },    

    // cntBlocks
    setcntBlocks(state, action) {
      state.cntBlocks = action.payload;
    },  
    // sliderBlockList
    setsliderBlockList(state, action) {
      state.sliderBlockList = action.payload;
    },  

    // sliderActive
    setsliderActive(state, action) {
      state.sliderActive = action.payload;
    },

    // search params -------------------------------
    // isKupe
    setisKupe(state, action) {
      state.searchParams.isKupe = action.payload;
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



// https://stackoverflow.com/questions/65277731/redux-toolkit-accessing-state-from-thunk
// https://github.com/reduxjs/redux-thunk#motivation

// main routes fetch function
export const fetchRoutes = (idFrom, idTo) => async (dispatch, getState) => { 
  const stt = getState();
  //console.log('stt=', stt);
  //console.log(`thunk => perPage=${stt.ticketReducer.ticketsPerPage}, offset=${stt.ticketReducer.offset}`);
  let limit = stt.ticketReducer.ticketsPerPage;
  let offset = stt.ticketReducer.offset * stt.ticketReducer.ticketsPerPage;

  let url = `${baseURL}/routes?from_city_id=${idFrom}&to_city_id=${idTo}&limit=${limit}&offset=${offset}`;
  //console.log(`url = ${url}`);
  let resp = await fetch(url);
  let data = await resp.json();
  //console.log('data tickets search=', data);
  // set to store
  dispatch(actionsTicketReducer.setTicketsSearchResult(data));
}

//
/* 
1) purpose: recalculate number of pages and buttons to slide among them

2) input: 
- storeticketsPerPage
- total_count  (= ticketsSearchResult.total_count)

3) output:
- blocksCnt
- blockArr
*/
export const makeCalcsAAA = (storeticketsPerPage, total_count) => (dispatch) => {
  let blocksCnt;
  let blockArr = [];

  //console.log(`perPage=${storeticketsPerPage}, totalCount=${total_count}`);
  if ( (storeticketsPerPage > 0) && (total_count !== undefined) && (total_count > 0) ) {
    // 
    if ( storeticketsPerPage > total_count) {
      //console.log('storeticketsPerPage > total_count')
      blockArr.push(1);   // push 1 page in array
      // setters
      dispatch( actionsTicketReducer.setcntBlocks(1) );               //setcntBlocks(1);
      dispatch( actionsTicketReducer.setsliderBlockList(blockArr) );
      dispatch( actionsTicketReducer.settoffset(0) );
      return;
    }

    // cnt  
    blocksCnt = Math.floor(total_count / storeticketsPerPage);
    if ((storeticketsPerPage %  total_count) !== 0) {
      //console.log(`blocksCnt added 1`);
      blocksCnt += 1;
    }
    //console.log(`blocksCnt 1 =${blocksCnt}`);

    // Arr      
    for (let i=1; i <= blocksCnt; i++) {
      blockArr.push(i);
    }

    // setters
    dispatch( actionsTicketReducer.setcntBlocks(blocksCnt) );       //setcntBlocks(blocksCnt);
    dispatch( actionsTicketReducer.setsliderBlockList(blockArr) );  //setsliderBlockList(blockArr);
    dispatch( actionsTicketReducer.settoffset(0) );
    return;
  }
}




// support functions --------------------------------------

export const tsToDate = (ts) => {
  // тут можно подкрутить формат
  return new Date(ts * 1000).toISOString().slice(0,19);
}

export const tsToTime = (ts) => {
  function propLen(dt) {
    let dt2 = dt.toString();
    return (dt2.length<2) ? '0'+dt2 : dt2;
  }
  let ts2 = new Date(ts);
  return propLen(ts2.getHours()) + ':' + propLen(ts2.getMinutes()) + ':' + propLen(ts2.getSeconds());
}

export const constructRoutesURL = () => {
  console.log('it\'s constructRoutesURL');
}


