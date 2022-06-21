
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
// slider
import TickSel_Slider from "../components/TickSel_Slider";


export default function PageSeatSelect(props) {
  // store
  const storeTicketsLast = useSelector( (store) => store.ticketReducer.ticketsLast);
  // train id from url
  const {trainId} = useParams();
  //
  const [seatData, setseatData] = useState([]);
  const [seatDataLoaded, setseatDataLoaded] = useState(false);

  //
  useEffect( () => {
    async function getData(trainId) {
      let url = `https://fe-diplom.herokuapp.com/routes/${trainId}/seats`;
      console.log(`url=${url}`);
      let resp = await fetch(url);
      let data = await resp.json();
      setseatData(data);
      setseatDataLoaded(true);
    };
    //
    window.scrollTo(0,0); // scroll up
    getData(trainId);     // fetch data
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
              { seatData.map( (item) => {
                return <>
                <br/> <div>{JSON.stringify(item.coach)}</div> 
                <br/> <div>{JSON.stringify(item.seats)}</div>
                <hr />
                </>
              })
              }
              </> 
              : <></> 
            }
        </div>
          
        <TickSel_Slider />

      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>)
}
