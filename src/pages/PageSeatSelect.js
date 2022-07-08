
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

import { useSelector/*, useDispatch*/ } from 'react-redux';

// styles (for template page layout)
import './PageTicketSelect.css';
import './PageSeatSelect.css';

// components
//import Navigation from "../components/Navigation"
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import Coach from "../components/Coach";



import NavigationTicket from "../components/NavigationTicket";

// left side pandels
import TickSel_SearchPanel from "../components/TickSel_SearchPanel";
import TickSel_TicketsLatest from "../components/TickSel_TicketsLatest";
// slider
//import TickSel_Slider from "../components/TickSel_Slider";


const baseURL = process.env.REACT_APP_BASE_URL;

/*
Components: 
- Coach.js (схема вагона)
*/

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
      let url = `${baseURL}/routes/${trainId}/seats`; //https://fe-diplom.herokuapp.com
      //console.log(`url=${url}`);
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
    <div className="TSHeader">
      <HeaderLogoNavi/>

      <div className="tsform">
        <TicketSearchForm  direction='row' isFixed={false}/>
      </div>

      <NavigationTicket />
    </div>

    <div className="TSBody">
      <div> 
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      {/* список вагонов (отфильтрованный) и места какие в них есть */}
      <div> 
        <div>
          <div>
            train ID: {trainId}
          </div>
            
          { (seatDataLoaded) 
            ? <>
              { seatData.map( (item) => {
                return <div key={item._id}>
                {/* Coach component */}
                <Coach data={item} />
              </div>
            })
            }            
            </>
            
            : <></> 
          }
        </div>
          
        {/* 
        dispatch( fetchRoutes() );
        */}
        <button className="pageSeatSelect_forwardBtn">Далее</button>
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>)
}
