
//import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// styles
import './PageTicketSelect.css';

// components
//import Navigation from "../components/Navigation"
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSingle from "../components/TicketSingle";

import NavigationTicket from "../components/NavigationTicket";

// left side pandels
import TickSel_SearchPanel from "../components/TickSel_SearchPanel";
import TickSel_TicketsLatest from "../components/TickSel_TicketsLatest";
// slider
import TickSel_Slider from '../components/TickSel_Slider';

// -------------------------------------
export default function PageTicketSelect(props) {
  // store
  const storeTicketsLast = useSelector( (store) => store.ticketReducer.ticketsLast);
  const storeTicketsSearchResult = useSelector( (store) => store.ticketReducer.ticketsSearchResult);

  //
  return (<>
    <div className="TSHeader">
      <HeaderLogoNavi/>
      
      <div className="tsform">
        <TicketSearchForm  direction='row'/>
      </div>

      <NavigationTicket />
    </div>

    <div className="TSBody">
      <div className="TSBody__left">
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      <div className="TSBody__right"  style={{overflowX: 'scroll'}}>
        {/* ticket search information */}
        <div className="TicketList">
          <h3>Билеты</h3>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div>Найдено: ({storeTicketsSearchResult.total_count})</div>
            <div>Сортировать по: времени</div>
            <div>показывать по: 5 10 20</div>
          </div>
          <ul style={{padding: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column'}}>
            {
            (storeTicketsSearchResult.total_count > 0)
            ? <>
              { storeTicketsSearchResult.items.map( (item) => {
                return <li key={item.departure._id} style={{minWidth: '900px', minHeight: '300px', margin: '0px 20px 20px 0px'}}>
                  <TicketSingle ticket={item} />
                </li>  
              }) }
            </>
            : <></>
            }
          </ul>
        </div>
        
        {/* pagination */}
        <TickSel_Slider />
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>
  )
}


