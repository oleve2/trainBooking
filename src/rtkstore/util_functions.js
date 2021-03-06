
import { differenceInMinutes, parseISO } from 'date-fns';

// support functions --------------------------------------
//
export const tsToDate = (ts) => {
  // тут можно подкрутить формат
  return new Date(ts * 1000).toISOString().slice(0,19);
}

//
export const tsToTime = (ts) => {
  function propLen(dt) {
    let dt2 = dt.toString();
    return (dt2.length<2) ? '0'+dt2 : dt2;
  }
  let ts2 = new Date(ts);
  return propLen(ts2.getHours()) + ':' + propLen(ts2.getMinutes()) + ':' + propLen(ts2.getSeconds());
}

// 
/**/
export const timeInTravelMins = (df, dt) => {
  let dfM = parseISO(tsToDate(df));
  let dtM = parseISO(tsToDate(dt));
  //console.log(df, dt, dfM, dtM);
  // in minutes
  let res = differenceInMinutes(dtM, dfM);
  // formatted string
  let resForm = `${Math.floor(res / 60)}:${res % 60}:00`;
  return resForm;
}




// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// build a query string for fetching tickets by routes (to use in "fetchRoutes")
export const buildRoutesQuery = (state, baseURL) => {
  // final url
  let routesURL=`${baseURL}`; 

  // [search params]
  let tickRedSP = state.ticketReducer.searchParams;
  
  // 1-1) cityFrom cityTo
  if ( (tickRedSP.cityFrom === undefined) || (tickRedSP.cityTo === undefined) ) {
    alert('cityFrom or cityTo is not set');
    return;
  } else {
    routesURL += `/routes?from_city_id=${tickRedSP.cityFrom._id}&to_city_id=${tickRedSP.cityTo._id}`;
  }
  
  // 1-2) dateDepart dateReturn
  if ( tickRedSP.dateDepart != '') { routesURL += `&date_start=${tickRedSP.dateDepart}` }
  if ( tickRedSP.dateReturn != '') { routesURL += `&date_end=${tickRedSP.dateReturn}` }
  
  // 1-3) is-flags
  if ( tickRedSP.isKupe      === true) { routesURL += `&have_second_class=${tickRedSP.isKupe}` }
  if ( tickRedSP.isPlatskart === true) { routesURL += `&have_third_class=${tickRedSP.isPlatskart}` }
  if ( tickRedSP.isSitting   === true) { routesURL += `&have_fourth_class=${tickRedSP.isSitting}` }
  if ( tickRedSP.isLux       === true) { routesURL += `&have_first_class=${tickRedSP.isLux}` }
  if ( tickRedSP.isWifi      === true) { routesURL += `&have_wifi=${tickRedSP.isWifi}` }
  if ( tickRedSP.isExpress   === true) { routesURL += `&have_express=${tickRedSP.isExpress}` }

  // 1-4) priceFrom priceTo
  if ( tickRedSP.priceRange !== undefined ) { routesURL += `&price_from=${tickRedSP.priceRange[0]}&price_to=${tickRedSP.priceRange[1]}` }

  // limit and offset
  let tickRed = state.ticketReducer; // ticket reducer head
  let limit   = tickRed.ticketsPerPage;
  let offset  = tickRed.offset * tickRed.ticketsPerPage;  
  routesURL += `&limit=${limit}&offset=${offset}`;

  // final return
  //console.log('routesURL=', routesURL);
  return routesURL;
}


// ---------------------------------
// build a query string for fetching tickets by routes (to use in "fetchRoutes")
export const buildSeatsQuery = (trainId, state, baseURL) => {
  // final url
  let seatsURL=`${baseURL}/routes/${trainId}/seats?`;   
  //console.log('seatsURL = ', seatsURL);
  return seatsURL;
}

// ---------------------------------
// if val undefined return '' - state in passengerAddForm and pagePayment
export const checkPAF = (val) => {
  if (val !== undefined) {
    return val;
  } else {
    return '';
  }
}

