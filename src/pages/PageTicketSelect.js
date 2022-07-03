
import { useState, useEffect } from "react";
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
// ticket display parameters
import TickSel_TicketDisplayParams from "../components/TickSel_TicketDisplayParams";


// custom window resize hook  // https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
import useWindowDimensions from '../hooks/useWindowDimensions';

// store - to update ticketsPerPage
import { actionsTicketReducer } from "../rtkstore/ticketReducer";
import { makeCalcsAAA } from "../rtkstore/ticketReducer";

// -------------------------------------
export default function PageTicketSelect(props) {
  const dispatch = useDispatch();

  // store
  const storeTicketsLast = useSelector( (store) => store.ticketReducer.ticketsLast);
  const storeTicketsSearchResult = useSelector( (store) => store.ticketReducer.ticketsSearchResult);

  const {height, width} = useWindowDimensions();

  // onScroll={handScroll}
  const handScroll = (e) => { console.log(e.target.scrollLeft) }

  // кнопки показывать по
  const storeticketsPerPage = useSelector( (store) => store.ticketReducer.ticketsPerPage )
  const storeticketsPerPageList  = useSelector( (store) => store.ticketReducer.ticketsPerPageList )
  //const [ticketsByPageLimitActive, setticketsByPageLimitActive] = useState(storeticketsPerPage);

  //
  return (<>
    {/* width={width} height={height} */}
    <div className="TSHeader">
      <HeaderLogoNavi/>
      
      <div className="tsform">
        <TicketSearchForm  direction='row' isFixed={false}/>
      </div>

      <NavigationTicket />
    </div>

    <div className="TSBody">
      {/* left side */}
      <div> 
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      {/* right side */}
      <div style={{border:'1px solid blue', overflowX:'scroll'}}> 
        <div className='TicketList'>
          <h3>Билеты</h3>

          {/* отображение билетов */}
          <TickSel_TicketDisplayParams 
            storeticketsPerPageList={storeticketsPerPageList}
            ticketsByPageLimitActive={storeticketsPerPage}
          />
          
          {/*  */}
          <ul className='TicketList__ul'>
            {
            (storeTicketsSearchResult.total_count > 0)
            ? <>
              { storeTicketsSearchResult.items.map( (item) => {
                return <li key={item.departure._id} className='TicketList__li'>
                  <TicketSingle ticket={item} />
                </li>  
              }) }
            </>
            : <></>
            }
          </ul>
        </div>
        
        {/* pagination */}
        <TickSel_Slider 
          total_count={storeTicketsSearchResult.total_count}
        />
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>
  )
}


