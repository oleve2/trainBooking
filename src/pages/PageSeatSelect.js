
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

import { useSelector/*, useDispatch*/ } from 'react-redux';

// styles
import './PageTicketSelect.css';

// components
//import Navigation from "../components/Navigation"
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";
//import TicketSingle from "../components/TicketSingle";

import NavigationTicket from "../components/NavigationTicket";

// left side pandels
import TickSel_SearchPanel from "../components/TickSel_SearchPanel";
import TickSel_TicketsLatest from "../components/TickSel_TicketsLatest";



export default function PageSeatSelect(props) {
  // store
  const storeTicketsLast = useSelector( (store) => store.ticketReducer.ticketsLast);

  const {trainId} = useParams();

  const [seatData, setseatData] = useState([]);
  const [seatDataLoaded, setseatDataLoaded] = useState(false);

  //
  useEffect( () => {
    async function getData(trainId) {
      let resp = await fetch(`https://fe-diplom.herokuapp.com/routes/${trainId}/seats`);
      let data = await resp.json();
      setseatData(data);
      setseatDataLoaded(true);
    };
    //
    getData(trainId);
  },[])

  return (<>
    <div className="TSHeader block">
      <HeaderLogoNavi/>

      <div className="tsform">
        <TicketSearchForm  direction='row'/>
      </div>

      <NavigationTicket />
    </div>

    <div className="TSBody block">
      <div className="TSBody__left">
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      <div className="TSBody__right"  style={{overflowX: 'scroll'}}>
        <div>
          <div>train ID: {trainId}</div>
            { (seatDataLoaded) 
              ? <>
              {JSON.stringify(seatData)}
              </> 
              : <></> 
            }
        </div>

        <div className="TicketSlider block" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h4>Крутилка</h4>
          <div style={{display: 'flex'}}>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>left</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>1</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>2</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>3</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>4</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>right</div>
          </div>
        </div>
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>)
}
