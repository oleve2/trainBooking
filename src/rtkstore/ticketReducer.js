import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from 'lodash';

import { buildRoutesQuery, buildSeatsQuery } from "./util_functions";

const baseURL = process.env.REACT_APP_BASE_URL;


const initialState = {
  // -------------------------
  ticketsLast: [],
  ticketsSearchResult: [],          // original query result
  seatsSearchResult: [],
  //flgSeatsLoaded: false,
  searchURL: '',
  // -------------------------
  // cnt ticket per page
  ticketsPerPage: 5,
  ticketsPerPageList: [5,10,15],
  offset: 0,
  
  cntBlocks: 0,
  sliderBlockList: [],
  sliderActive: 1,

  // NavigationProgress
  navigationProgressList: [
    {id: 1, name: 'Билеты'},
    {id: 2, name: 'Пассажиры'},
    {id: 3, name: 'Оплата'},
    {id: 4, name: 'Проверка'},
  ],
  navigationProgressActive: 1,

  // purchase information
  purchaseTrain: {},
  purchaseTrainDetails: {},
  purchaseSeats: [],

  // -------------------------
  searchParams: {
    // обязательные параметры
    cityFrom: '', //[],
    cityTo: '', //[],

    // даты для обязаельных
    dateDepart: '',
    dateReturn: '',

    // прочее
    isKupe: false,
    isPlatskart: false,
    isSitting: false,
    isLux: false,
    isWifi: false,
    isExpress: false,

    priceRange: [1, 10000],
    // 
    tudaDepartDateRange: [0, 24],
    tudaArrivDateRange: [0, 24]
  }
}

const ticketReducer = createSlice({
  name: 'ticketReducer',
  initialState: initialState,
  reducers: {
    // cities
    setCityFrom(state, action) { state.searchParams.cityFrom = action.payload },
    setCityTo(state, action) { state.searchParams.cityTo = action.payload },
    // dates
    setdateDepart(state, action) { state.searchParams.dateDepart = action.payload },
    setdateReturn(state, action) { state.searchParams.dateReturn = action.payload },

    // API fetch results -------------------------------
    // Last
    setTicketsLast(state, action) { state.ticketsLast = action.payload },

    // ticketsSearchResult
    setTicketsSearchResult(state, action) { state.ticketsSearchResult = action.payload }, 

    // seatsSearchResult
    setseatsSearchResult(state, action) { state.seatsSearchResult = action.payload }, 
    // flgSeatsLoaded
    //setflgSeatsLoaded(state, action) { state.flgSeatsLoaded = action.payload }, 

    // display options -------------------------------
    // set ticketsPerPage
    setticketsPerPage(state, action) { state.ticketsPerPage = action.payload },

    // offset for slider
    settoffset(state, action) { state.offset = action.payload },    

    // cntBlocks
    setcntBlocks(state, action) { state.cntBlocks = action.payload },  
    // sliderBlockList
    setsliderBlockList(state, action) { state.sliderBlockList = action.payload },  

    // sliderActive
    setsliderActive(state, action) { state.sliderActive = action.payload },

    // search params -------------------------------
    // isKupe
    setisKupe(state, action) { state.searchParams.isKupe = action.payload },  
    // isPlatskart
    setisPlatskart(state, action) { state.searchParams.isPlatskart = action.payload }, 
    // isSitting
    setisSitting(state, action) { state.searchParams.isSitting = action.payload },  
    // isLux
    setisLux(state, action) { state.searchParams.isLux = action.payload },  
    // isWifi
    setisWifi(state, action) { state.searchParams.isWifi = action.payload },  
    // isExpress
    setisExpress(state, action) { state.searchParams.isExpress = action.payload },
    /*
    // priceFrom
    setpriceFrom(state, action) { state.searchParams.priceFrom = action.payload },
    // priceTo
    setpriceTo(state, action) { state.searchParams.priceTo = action.payload },
    */
    // priceRange
    setpriceRange(state, action) { state.searchParams.priceRange = action.payload },
    // tudaDepartDateRange
    settudaDepartDateRange(state, action) { state.searchParams.tudaDepartDateRange = action.payload },
    // tudaArrivDateRange
    settudaArrivDateRange(state, action) { state.searchParams.tudaArrivDateRange = action.payload },

    // navigationProgress
    setnavigationProgressActive(state, action) { state.navigationProgressActive = action.payload },

    // purchase information  -------------------------------
    // train info
    setpurchaseTrain(state, action) { state.purchaseTrain = action.payload },
    // purchaseTrainDetails
    setpurchaseTrainDetails(state, action) { state.purchaseTrainDetails = action.payload },
    // seats info
    setpurchaseSeats(state, action) { state.purchaseSeats = action.payload }

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


// -------------------------------------------------------------
// https://stackoverflow.com/questions/65277731/redux-toolkit-accessing-state-from-thunk
// https://github.com/reduxjs/redux-thunk#motivation

// main routes fetch function
export const fetchRoutes = () => async (dispatch, getState) => {
  // 01) get state values info
  const stt = getState();
  //console.log('stt=', stt);
  //console.log(`thunk => perPage=${stt.ticketReducer.ticketsPerPage}, offset=${stt.ticketReducer.offset}`);
  //let limit = stt.ticketReducer.ticketsPerPage;
  //let offset = stt.ticketReducer.offset * stt.ticketReducer.ticketsPerPage;

  // 02-1) build url from data in store
  let url = buildRoutesQuery(stt, baseURL);
  //let url = `${baseURL}/routes?from_city_id=${idFrom}&to_city_id=${idTo}&limit=${limit}&offset=${offset}`;
  //console.log(`url = ${url}`);
  
  // 02-2) fetch
  let resp  = await fetch(url);
  let data = await resp.json();
  //console.log('data tickets search=', data);
  
  // 03) set to store
  dispatch(actionsTicketReducer.setTicketsSearchResult(data));
}


// main seats fetch function
export const fetchSeats = (trainId) => async (dispatch, getState) => {
  // 01) get state values info
  const stt = getState();

  // 02-1) build url from data in store
  let url = buildSeatsQuery(trainId, stt, baseURL);
  
  // 02-2) fetch
  let resp = await fetch(url);
  let data = await resp.json();
  console.log('data seats search=', data);
  
  // 03) set to store
  dispatch( actionsTicketReducer.setseatsSearchResult(data) );
}

// -------------------------------------------------------------

// calculate tickets display parameters
/* 
1) purpose: recalculate number of pages and buttons to slide among them
2) input: 
  - par_storeticketsPerPage
  - par_total_count  (= ticketsSearchResult.total_count)
3) output:
  - blocksCnt
  - blockArr
*/
export const makeCalcsAAA = (par_storeticketsPerPage, par_total_count) => (dispatch) => {
  let blocksCnt;
  let blockArr = [];

  //console.log(`perPage=${par_storeticketsPerPage}, totalCount=${par_total_count}`);
  if ( (par_storeticketsPerPage > 0) && (par_total_count !== undefined) && (par_total_count > 0) ) {
    // 
    if ( par_storeticketsPerPage > par_total_count) {
      //console.log('par_storeticketsPerPage > par_total_count')
      blockArr.push(1);   // push 1 page in array
      // setters
      dispatch( actionsTicketReducer.setcntBlocks(1) );               //setcntBlocks(1);
      dispatch( actionsTicketReducer.setsliderBlockList(blockArr) );
      dispatch( actionsTicketReducer.settoffset(0) );
      return;
    }

    // cnt  
    blocksCnt = Math.floor(par_total_count / par_storeticketsPerPage);
    if ((par_storeticketsPerPage %  par_total_count) !== 0) {
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

// set min and max prices in the slider
export const setMinMaxPrices = (priceFrom, priceTo) => async (dispatch) => {
  dispatch( actionsTicketReducer.setpriceFrom(priceFrom) );
  dispatch( actionsTicketReducer.setpriceFrom(priceTo) );
  console.log('store prices set');
}

//priceRange
export const updatepriceRange = (val) => async (dispatch) => {
  dispatch( actionsTicketReducer.setpriceRange(val) );
}
// 
export const updatetudaDepartDateRange = (val) => async (dispatch) => {
  dispatch( actionsTicketReducer.settudaDepartDateRange(val) );
}
//
export const updatetudaArrivDateRange = (val) => async (dispatch) => {
  dispatch( actionsTicketReducer.settudaArrivDateRange(val) );
}


// [work with seats]
// переименовать!!!
export const SeatsDoAction = (item) => async (dispatch, getState) => {
  //console.log('reducer item=', item); // {coachName: 'ЛД-74', seatIndex: 1, selected: true/false}
  
  // get purchase seat list from store
  const stt = getState();
  let psList = stt.ticketReducer.purchaseSeats;
  let psListDC = cloneDeep(psList);
  //console.log('reducer psListDC=', psListDC);
  
  // case add (selected = true)
  if (item.selected === true) {
    psListDC.push( item );
    dispatch( actionsTicketReducer.setpurchaseSeats(psListDC) );
  }
  
  // case remove (selected = false)
  if (item.selected === false) {
    let psListFiltered = psListDC.filter( (it) => {
      return (  (it.coachName !== item.coachName) || (it.seatIndex !== item.seatIndex));
    })
    //console.log('psListFiltered new = ', psListFiltered);
    dispatch( actionsTicketReducer.setpurchaseSeats(psListFiltered) );
  }
}



// ====================================================================================

