
import { useSelector, useDispatch } from "react-redux";
// store
import { actionsTicketReducer, makeCalcsAAA, fetchRoutes } from "../rtkstore/ticketReducer";

/* 
props:
- storeticketsPerPageList
- ticketsByPageLimitActive
*/
//
export default function TickSel_TicketDisplayParams(props) {
  const dispatch = useDispatch();

  // store
  const storeticketsPerPage = useSelector( (store) => store.ticketReducer.ticketsPerPage );
  const storeTicketsSearchResult = useSelector( (store) => store.ticketReducer.ticketsSearchResult);

  //
  const setPageLimitToStore = (val) => {
    dispatch( actionsTicketReducer.setticketsPerPage(val) );  // update store
    dispatch( makeCalcsAAA(storeticketsPerPage, storeTicketsSearchResult.total_count) );
    dispatch( fetchRoutes() ); //storeCityFrom._id, storeCityTo._id
  }

  //
  return (
    <div className='TicketList__info'>
    <div className="dispParams__text">Найдено: {storeTicketsSearchResult.total_count}</div>

    <div className="dispParams__text">Сортировать по: времени</div>
    
    <div style={{display:'flex'}}>
      <div className="dispParams__text">показывать по:</div>
      { props.storeticketsPerPageList.map( (item) => {
        return <div key={item}
          className={"ticketLimit" + ((props.ticketsByPageLimitActive == item) ? " ticketLimit_active" : "")} 
          onClick={() => { setPageLimitToStore(item)} }
          >
          {item}
        </div>
      }) }
    </div>
  </div>
  )
}


