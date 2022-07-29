
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";

// styles
import './PageTicketSelect.css';

// components
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSingle from "../components/TicketSingle";
import NavigationProgress from "../components/NavigationProgress";

// left side panels
import TickSel_SearchPanel from "../components/TickSel_SearchPanel";
import TickSel_TicketsLatest from "../components/TickSel_TicketsLatest";
// slider
import TickSel_Slider from '../components/TickSel_Slider';
// ticket display parameters
import TickSel_TicketDisplayParams from "../components/TickSel_TicketDisplayParams";

//
export default function PageTicketSelect() {
  const dispatch = useDispatch();

  // store
  const storeTicketsLast         = useSelector( (store) => store.ticketReducer.ticketsLast);
  const storeTicketsSearchResult = useSelector( (store) => store.ticketReducer.ticketsSearchResult);

  // кнопки показывать по
  const storeticketsPerPage = useSelector( (store) => store.ticketReducer.ticketsPerPage )
  const storeticketsPerPageList  = useSelector( (store) => store.ticketReducer.ticketsPerPageList )

  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(1) );
    dispatch( actionsTicketReducer.setpurchaseTrain({}) );
    dispatch( actionsTicketReducer.setpurchaseSeats([]) );
  },[])
  

  //
  return (<>
    <div className="TSHeader">
      <HeaderLogoNavi/>
      
      <div className="tsform">
        <TicketSearchForm  direction='row' isFixed={false}/>
      </div>

      <NavigationProgress />
    </div>

    <div className="TSBody">
      <div> 
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      <div style={{overflowX:'scroll'}}>
        <div className='TicketList'>
          <h3>Билеты</h3>

          <TickSel_TicketDisplayParams 
            storeticketsPerPageList={storeticketsPerPageList}
            ticketsByPageLimitActive={storeticketsPerPage}
          />
          
          <ul className='TicketList__ul'>
            {
            (storeTicketsSearchResult.total_count > 0)
            ? <>
              { storeTicketsSearchResult.items.map( (item) => {
                return <li key={item.departure._id} className='TicketList__li'>
                  <TicketSingle 
                    ticket={item} 
                    usedPage="ticket_select"
                  />
                </li>  
              }) }
            </>
            : <></>
            }
          </ul>
        </div>
        
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
